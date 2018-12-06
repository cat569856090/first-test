//用户信息
let user = {};
//图片缓存
let image = {};
//用户游戏信息
let gameData = {
    //音乐开关
    musicEnabled: true,
    //音效开关
    soundEnabled: true,
    //数据更新时间
    updateTimestamp: 0,
    //注册进来的时间
    RegisterTimestamp: 0,
    //体力恢复起始时间
    power_time: 0,
    //体力
    Power: 0,
    //经验
    Exp: 0,
    //等级
    Level: 1,
    //金钱
    Money: 1000,
    //是否第一次分享
    hasShare: false,
};

//游戏配置
let config = {
    allow_share: false,
    allow_pay: false,
};

//音频ID
const audio = {
    background: null,
    volume: 1,
};

const Global = {
    user, //用户信息
    image, //图片缓存
    gameData, //游戏信息
    config, //游戏配置
    audio, //音频
};

export default Global;