/**
 * 仙缘游戏逻辑 js
 * by:灰尘
 */
//全局对象
var app = new Vue({
    el: '#xy-box',
    data: {
        index: 0, //当前页 0:起始页 1:首页 2:历练
        canAttack: true, //是否能攻击，攻击有cd时间
        attackCdTimer: null, //攻击cd刷新定时器
        currentLevel: {},
        currentMonsters: [],
        levelCurrentStep: 0, //关卡当前走完第几步了
        monsterTotalLife: 0, //怪物总血量，目前每个小关每个怪物总血量一致
        monsterMaxCount: 5, //怪物最大数量
        attackBgWidthList: [], //背景宽度
    },
    created() {
        this.currentLevel = level_1;
        this.refreshMonsters();
    },
    methods: {
        //前往历练
        goExp: function(level) {
            this.index = 2; //显示历练
            if(level == 1){
                this.currentLevel = level_1;
            }
            if(level == 5){
                this.currentLevel = level_5;
            }
            this.refreshMonsters(); //刷怪
        },
        //攻击
        attack: function(index){
            const showPanel = $("#xy-experience-show");
            if(!this.canAttack){
                showPanel.append('休息一会儿再战吧......\n');
                showPanel.scrollTop(showPanel[0].scrollHeight);
                return;
            }
            this.canAttack = false;
            this.currentMonsters[index].life -= 30;
            if(this.currentMonsters[index].life <= 0){
                this.currentMonsters.splice(index,1);
                this.canAttack = true;
                if(this.currentMonsters.length == 0){
                    this.levelCurrentStep += 1;
                    if(this.levelCurrentStep >= this.currentLevel.steps.length) {
                        showPanel.append('已经通关！\n');
                        return;
                    }
                    this.refreshMonsters();
                }
                return;
            }
            const monsterName = this.currentMonsters[index].name;
            showPanel.append(`<span class="xyb">你</span>  对  <span class="xye">${monsterName}</span>  发起攻击，造成  30  点伤害，  <span class="xye">${monsterName}</span>  生命减少  30\n`);
            showPanel.scrollTop(showPanel[0].scrollHeight);
            var _this = this;
            this.attackCdTimer = setInterval(function(){
                var width = _this.attackBgWidthList[index];
                if(width <= 0){
                    _this.attackBgWidthList[index] = 60;
                    _this.canAttack = true;
                    clearInterval(_this.attackCdTimer);
                    return;
                }
                _this.attackBgWidthList[index] -= 1;
                _this.attackBgWidthList = Object.assign({}, _this.attackBgWidthList);
            }, 10)
        },       
        //刷怪
        refreshMonsters: function(){
            //随机1-5只怪
            var monster = this.currentLevel.monsters[this.levelCurrentStep];
            this.monsterTotalLife = monster.life;
            this.currentMonsters = [];
            this.attackBgWidthList = [];
            var num = Math.floor(Math.random() * this.monsterMaxCount) + 1;
            for(var i=0;i<num;i++){
                this.attackBgWidthList.push(60);
                this.currentMonsters.push(JSON.parse(JSON.stringify(monster)));
            }
            //console.log(this.currentMonsters);
        } 
    }
})
