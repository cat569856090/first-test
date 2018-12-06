import Global from './Global'
import PublicFunction from './PublicFunction'

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let self = this;
        if (CC_WECHATGAME) {
            wx.onShow(() => { self.ComeBack() });
            wx.onHide(() => { self.GoOut(); });
        }
        this.nowtime = new Date().getTime();//获取时间
        this.Sound = this.node.getComponent("Sound");
        //背景音乐
        this.Sound.PlayBG();
    },

    //回到前台
    ComeBack() {
        console.log("回到前台");
    },

    GoOut() {
        Global.gameData.updateTimestamp = Date.now();
    },

    start() {
        let self = this;
        this.secondTime = 0;
        this.OnePowerTime = 2;//恢复一点体力所需时间
        this.node.on('refresh', function (event) {
            self.Refresh();
            event.stopPropagation();
        });
        this.Refresh();
        console.log(Global);
    },

    Refresh() {
    },

    //刷新体力
    RefreshPower: function (num = 0) {
        let max = 100;//体力上限
        num = parseInt(num);
        let p = Global.gameData.Power;
        if (num < 0) {
            if (p == max) {//在体力满了后使用，会设置回复起始时间
                Global.gameData.power_time = this.nowtime;
            }
        }
        if (Global.gameData.Power + num >= max) {
            Global.gameData.Power = max;
        }
        else {
            Global.gameData.Power += num;
        }

        if (Global.gameData.Power == max) {
            let string = "00:00";
        }
        else {
            let arr = this.TransTimeNum(this.OnePowerTime, this.nowtime - Global.gameData.power_time);
            let string = arr == null ? "00:00" : ("0" + arr[0] + ":" + (arr[1] > 9 ? arr[1] : ("0" + arr[1])));
        }
    },

    //倒计时转换（最大分钟数，时间戳）
    TransTimeNum: function (maxMinute, str) {
        let fivemin = maxMinute * 60 * 1000;
        str = (fivemin - parseInt(str)) / 1000;
        str = str > 0 ? str : 0;
        if (str == 0) {
            return null;
        }
        let min = Math.floor(str / 60);
        let second = parseInt(str - min * 60);
        return [min, second];
    },

    update(dt) {
        this.secondTime += dt;
        if (this.secondTime >= 1) {
            this.secondTime--;
            this.nowtime += 1000;
            //体力
            let powermax = 100;
            if (Global.gameData.Power < powermax) {
                let pt = Math.floor((this.nowtime - Global.gameData.power_time) / (this.OnePowerTime * 1000 * 60));//计算该时间内回复了多少体力
                this.RefreshPower(pt);
                if (pt > 0) {//如果离线后仍然不满
                    Global.gameData.power_time += pt * (this.OnePowerTime * 1000 * 60);
                }
            }
            else {
                this.RefreshPower(0);
            }
        }
    },
});
