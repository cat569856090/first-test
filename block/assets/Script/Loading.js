import Global from './Global'

cc.Class({
    extends: cc.Component,

    properties: {
        startBtn: {
            default: null,
            type: cc.Node,
            displayName: "开始按钮"
        },
        loadingBar: {
            default: null,
            type: cc.Node,
            displayName: "进度条"
        },
        loadingNum: {
            default: null,
            type: cc.Label,
            displayName: "百分比"
        },
    },

    // LIFE-CYCLE CALLBACKS:

    Load: function (path, cb) {
        let self = this;
        cc.loader.loadRes(path, function (err, res) {
            if (err) {
                cc.error(err.message || err);
            }
            else if (typeof cb == "function") {
                cb(res.json);
                self.isLoad--;
            }
        });
    },

    LoadAtlas: function (path, cb) {
        let self = this;
        cc.loader.loadRes(path, cc.SpriteAtlas, function (err, atlas) {
            if (err) {
                cc.error(err.message || err);
            }
            else if (typeof cb == "function") {
                cb(atlas);
                self.isLoad--;
            }
        });
    },

    onLoad() {
        // 移除左下角信息
        cc.debug.setDisplayStats(false);
        this.timer = 0;
        this.isLoad = 0;//需要加载的JS文件数
        this.isLogin = false;//是否已经登录
        this.isGoingMain = true;//是否可以跳转了
        this.isLoadingFinish = false;//是否已经预加载完成

        if (CC_WECHATGAME) {
            // Login.initWeixin();
        }
        else {
            this.isLogin = true;
        }
    },

    start() {
        cc.director.preloadScene("main", (completedCount, totalCount, c) => {
            let pre = completedCount / totalCount;
            this.loadingBar.width = pre * 640;
            this.loadingNum.string = parseInt(pre * 100) + "%";
            if (!this.isLoadingFinish && (completedCount == totalCount)) {
                this.isLoadingFinish = true;
            }
        }, (a, b) => { });
    },

    GotoMain() {
        if (Global.gameData.RegisterTimestamp == 0) {
            Global.gameData.RegisterTimestamp = Date.now();
        }
        cc.director.loadScene("main");
    },

    playAnim() {
        if (!this.startBtn.active) {
            this.startBtn.active = true;
        }
    },

    update(dt) {
        this.timer += dt;
        if (this.timer > 1) {
            this.timer = 0;
            if (this.isLoad == 0 && this.isLogin && this.isLoadingFinish) {
                this.playAnim();
                if (this.isGoingMain) {
                    this.isGoingMain = false;
                    this.GotoMain();
                }
            }
        }
    },
});
