import Global from './Global'
import PublicFunction from './PublicFunction'
cc.Class({
    extends: cc.Component,
    properties: {
        game: {
            default: null,
            type: cc.Node,
            displayName: "游戏主节点"
        },
        tips: {
            default: null,
            type: cc.Node,
            displayName: "提示"
        },
    },

    start() {
    },
})