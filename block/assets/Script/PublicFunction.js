let Global = require("./Global")
module.exports = {
    LoadImage: function (arrayName, path, target, success, error) {
        if (Global.image[arrayName][path] && target) {
            target.getComponent(cc.Sprite).spriteFrame = Global.image[arrayName][path];
            success && success(target);
            return;
        }

        cc.loader.loadRes("image/" + arrayName + "/" + path, function (err, res) {
            if (err) {
                cc.error(err.message || err);
                console.log("路径", path);
                error && error();
                return;
            }
            var spf = new cc.SpriteFrame();
            spf.initWithTexture(res);
            Global.image[arrayName][path] = spf
            if (target) {
                target.getComponent(cc.Sprite).spriteFrame = spf;
            }
            success && success(target);
        });
    },
}