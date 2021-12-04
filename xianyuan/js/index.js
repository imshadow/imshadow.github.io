/**
 * 仙缘游戏逻辑 js
 * by:死灰
 */
//全局对象
var app = new Vue({
    el: '#xy-box',
    data: {
        index: 0, //当前页 0:起始页 1:首页 2:历练
        message: 'Hello Vue!',
        canAttack: true, //是否能攻击，攻击有cd时间
        attackCdTimer: null //攻击cd刷新定时器
    },
    methods: {
        //前往历练
        goExp: function() {
            
        },
        //攻击
        attack: function(){
            if(!this.canAttack){
                return;
            }
            this.canAttack = false;
            const showPanel = $("#xy-experience-show");
            showPanel.append('你 对 幽冥巨蟒 发起攻击，造成 30 点伤害，幽冥巨蟒生命减少 30\n');
            showPanel.scrollTop(showPanel[0].scrollHeight);
            const attackBgList = $("span.attack-bg");
            var _this = this;
            this.attackCdTimer = setInterval(function(){
                attackBgList.each((i,e) => {
                    var width = $(e).width();
                    if(width <= 0){
                        $(e).width(60);
                        _this.canAttack = true;
                        clearInterval(_this.attackCdTimer);
                        return;
                    }
                    $(e).width(width - 1);
                });
            },8)
        }        
    }
})
