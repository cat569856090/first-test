let Global = require("./Global")
cc.Class({
    extends: cc.Component,

    properties: {
        BGSound: {
            type: cc.AudioClip,
            default: null,
            displayName: "背景",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    PlaySound(name) {
        if (Global.gameData.soundEnabled) {
        }
    },
    PlayBG() {
        cc.audioEngine.stop(Global.audio.background);
        if (Global.gameData.musicEnabled) {
            // Global.audio.background = cc.audioEngine.play(this.BGSound, true, 0.5)
        }
    },
});
