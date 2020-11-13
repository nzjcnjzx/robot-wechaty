/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:13:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-11-13 23:41:34
 */
const crawl = require('../crawl')
const { FileBox, UrlLink, MiniProgram } = require("wechaty");
/**
 * 处理群消息
 * @param {object} msg 消息对象
 */
async function handleRoomMessage (msg) {

}
/**
 * 处理个人消息
 * @param {object} msg 消息对象
 */
async function handlePersonMessage (msg) {
    const content = msg.text().trim(); // 消息内容
    if (content == '天气') {
        crawl.weather(async weatherMessage => {
            await msg.say(weatherMessage)
        })
    }
    if (content == '图片') {
        const fileBox = FileBox.fromUrl('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3105295728,2665623167&fm=26&gp=0.jpg')
        await msg.say(fileBox);
    }
    if (content == '视频') {
        const fileBox = FileBox.fromUrl('https://vd4.bdstatic.com/mda-kkcfyc3zw0gvnnz9/v1-cae/sc/mda-kkcfyc3zw0gvnnz9.mp4?auth_key=1605248751-0-0-3fec4a511b7cb73e23baa351650845ee&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=8790_8')
        await msg.say(fileBox);
    }
    if (content == '小程序') {
        const miniProgram = new MiniProgram({
            appid: 'wxd65425733cce6898',
            description: '账单小程序',
            pagePath: 'pages/bill/list/index.html',
            // thumbnailurl: 'http://phone.darrenzhangx.cn/images/watch-img-2.jpg',
            title: '小记账单',
            username: 'gh_b8c9651ccffb@app',
            thumbKey: '9520b4ce9a370694796679db4b007b5c',
            thumbUrl: '30580201000451304f02010002047138303c02032f546b0204e22c306f02045faea8fa042a777875706c6f61645f777869645f37757a6c346479656f33766631323331365f313630353238323034320204010800030201000400'
        })
        await msg.say(miniProgram)
    }
    if (content == '链接') {
        const linkPayload = new UrlLink({
            description: 'Netty',
            thumbnailUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/48MFTQpxichmmxEoXZ1w7eno72H2MQdx1WC6JiaVdYRmwAp4MCcQbctE2IE7jWqkWOlgMPqMBXVAdR1N46xEibvoQ/640?wx_fmt=jpeg&wxtype=jpeg&wxfrom=0',
            title: 'Netty',
            url: 'http://mp.weixin.qq.com/s?__biz=MzU2MDU3MzE1Mg==&mid=2247484375&idx=1&sn=5ee91b0a8607a1766b5212a23d3c9179&chksm=fc04bc58cb73354e798403bcc03e293149bb115a0755940e334c0fbe33d7c3b0b0797120a213&scene=0&xtrack=1#rd'
        })
        await msg.say(linkPayload)
    }
}

module.exports = bot => {
    return async function onMessage (msg) {
        // if (msg.self()) return;
        console.log(msg)
        const room = msg.room(); // 是否是群消息
        if (room) {
            handleRoomMessage(msg)
        } else {
            handlePersonMessage(msg)
        }
    }
}