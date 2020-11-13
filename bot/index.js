/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:12:59 
 * @Last Modified by: Darren Zhang
 * @Last Modified time: 2020-11-13 16:00:14
 */
const { Wechaty } = require("wechaty");

const { ScanStatus } = require('wechaty-puppet')
const QrcodeTerminal = require("qrcode-terminal");
const onRoomJoin = require("./onRoomJoin") // 加入房间监听回调
const onMessage = require("./onMessage") // 消息监听回调
const onFriendShip = require("./onFriendShip") // 好友添加监听
const config = require("../config")
//  二维码生成
const onScan = (qrcode, code) => {
    if (code === 2) {
        QrcodeTerminal.generate(qrcode, {
            small: true,
        });
    }
};
// 登录
const onLogin = (user) => {
    console.log(`User ${user} logined`);
};

// 登出
const onLogout = (user) => {
    console.log(`User ${user} 登出`);
};

// 初始化
const bot = new Wechaty({
    name: config.name,
    puppet: 'wechaty-puppet-hostie',
    puppetOptions: {
        token: config.token
    }
})
// 事件监听
bot
    .on("scan", onScan)
    .on("login", onLogin)
    .on("logout", onLogout)
    .on("room-join", onRoomJoin)
    .on("friendship", onFriendShip)
    .on("message", onMessage(bot));


// 开始启动
bot
    .start()
    .then(async () => {
       console.log("开始登录微信")
    })
    .catch((err) => console.error(err));


module.exports = bot
