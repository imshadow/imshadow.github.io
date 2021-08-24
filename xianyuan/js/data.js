/**
 * 定义游戏内资源 关卡等
*/
/**
 * 装备 还有一个 仙兵
 * 攻 法器
 * 血 命石
 * 防 道服
 * 暴 灵戒
 * 闪 战靴
 */
//1级装备
const equips_1 = [
    {
        "id":1,
        "name":"1级法器",
        "type":"法器",
        "value":10,
        "level":1
    },
    {
        "id":2,
        "name":"1级命石",
        "type":"命石",
        "value":20,
        "level":1
    },
    {
        "id":3,
        "name":"1级道服",
        "type":"道服",
        "value":10,
        "level":1
    },
    {
        "id":4,
        "name":"1级灵戒",
        "type":"灵戒",
        "value":4,
        "level":1
    },
    {
        "id":5,
        "name":"1级战靴",
        "type":"战靴",
        "value":5,
        "level":1
    }
]

/**
 * 关卡定义
 */
//死亡沼泽(1级)
const level_1 = {
    "name": "死亡沼泽",
    "level": 1,
    "about": "一片充满死亡气息的沼泽，上面满是森森白骨",
    "monsterAbout": "怪物: 迷魂妖花，噬血灵蚁，剧毒魔蛛，幽冥巨蟒，血牙邪鳄，远古莽牛",
    "steps": [
        "你一脚踏入沼泽，遇到了",
        "你继续前进，发现一块草地，上面有",
        "你继续前进，碰到了",
        "你继续往前，迎面撞上了",
        "你穿过重重阻碍，来到这里，看到了",
        "你来到了最终目的地，这里有"
    ],
    "monsters": [
        {
            "name": "迷魂妖花",
            "attack": 5,
            "life": 100,
            "defense": 3,
            "force": 1,
            "dodge": 0
        },
        {
            "name": "噬血灵蚁",
            "attack": 5,
            "life": 100,
            "defense": 3,
            "force": 1,
            "dodge": 0
        },
        {
            "name": "剧毒魔蛛",
            "attack": 5,
            "life": 100,
            "defense": 3,
            "force": 1,
            "dodge": 0
        },
        {
            "name": "幽冥巨蟒",
            "attack": 5,
            "life": 100,
            "defense": 3,
            "force": 1,
            "dodge": 0
        },
        {
            "name": "血牙邪鳄",
            "attack": 5,
            "life": 100,
            "defense": 3,
            "force": 1,
            "dodge": 0
        },
        {
            "name": "远古莽牛",
            "attack": 5,
            "life": 100,
            "defense": 3,
            "force": 1,
            "dodge": 0
        }
    ],
    "drops": equips_1
}

//血色洞窟(5级)
const level_5 = {
    "name": "血色洞窟",
    "level": 5,
    "about": "洞窟外面呈血红色，里面只有一片阴森恐怖，让人望而生畏",
    "monsterAbout": "怪物: 暗影蝙蝠，血玉蜥蜴，碧睛魔鼠，洞窟血蝎，玉角魔蛇，火焰幻鸟",
    "steps": [
        "你一脚踏入沼泽，遇到了",
        "你继续前进，发现一块草地，上面有",
        "你继续前进，碰到了",
        "你继续往前，迎面撞上了",
        "你穿过重重阻碍，来到这里，看到了",
        "你来到了最终目的地，这里有"
    ],
    "monsters": [
        {
            "name": "暗影蝙蝠",
            "attack": 5,
            "life": 100,
            "defense": 3,
            "force": 1,
            "dodge": 0
        },
        {
            "name": "血玉蜥蜴",
            "attack": 5,
            "life": 100,
            "defense": 3,
            "force": 1,
            "dodge": 0
        },
        {
            "name": "碧睛魔鼠",
            "attack": 5,
            "life": 100,
            "defense": 3,
            "force": 1,
            "dodge": 0
        },
        {
            "name": "洞窟血蝎",
            "attack": 5,
            "life": 100,
            "defense": 3,
            "force": 1,
            "dodge": 0
        },
        {
            "name": "玉角魔蛇",
            "attack": 5,
            "life": 100,
            "defense": 3,
            "force": 1,
            "dodge": 0
        },
        {
            "name": "火焰幻鸟",
            "attack": 5,
            "life": 100,
            "defense": 3,
            "force": 1,
            "dodge": 0
        }
    ],
    "drops": equips_1
}