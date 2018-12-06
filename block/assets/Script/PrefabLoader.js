cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    start() {},

    OpenPrefab(target, fun, pre, isBG2 = false) {
        let self = this;
        if (target.childrenCount > 0) {
            this.CloseBG();
            if (isBG2) {
                target.children[0].getComponent(fun).OpenBG2();
            }
            else {
                target.children[0].getComponent(fun).OpenBG();
            }
        }
        else {
            if (CC_WECHATGAME) {
                wx.showLoading({
                    title: '加载中',
                    // mask: true,
                })
            }
            cc.loader.loadRes("prefab/" + pre, function (err, prefab) {
                let newNode = cc.instantiate(prefab);
                target.addChild(newNode);
                console.log("添加")

                self.CloseBG();
                if (isBG2) {
                    newNode.getComponent(fun).OpenBG2();
                }
                else {
                    newNode.getComponent(fun).OpenBG();
                }
                if (CC_WECHATGAME) {
                    wx.hideLoading();
                }
            });
        }
    },

    CloseBG() {
    }
});
