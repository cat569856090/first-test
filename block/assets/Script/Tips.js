cc.Class({
    extends: cc.Component,

    properties: {
        TipsBG: {
            default: null,
            type: cc.Node,
            displayName: "提示框"
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() { },

    start() {
        this.TipsBG.opacity = 0;
    },

    ShowTips: function (str) {
        this.TipsBG.opacity = 255;
        this.TipsBG.y = -70;
        this.TipsBG.getComponentInChildren(cc.Label).string = str;
    },

    update(dt) {
        //向上飘然后渐隐
        if (this.TipsBG.y < 0) {
            this.TipsBG.y += 2;
        }
        else if (this.TipsBG.opacity > 0) {
            this.TipsBG.opacity -= 4;
        }
    },
});
