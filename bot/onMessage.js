/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:13:13 
 * @Last Modified by: Darren Zhang
 * @Last Modified time: 2020-11-13 13:56:26
 */
const crawl = require('../crawl')
const { FileBox } = require("wechaty");
/**
 * 处理群消息
 * @param {object} msg 消息对象
 */
async function handleRoomMessage(msg) {

}
/**
 * 处理个人消息
 * @param {object} msg 消息对象
 */
async function handlePersonMessage(msg) {
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
}

module.exports = bot => {
    return async function onMessage(msg) {
        if (msg.self()) return;
        const room = msg.room(); // 是否是群消息
        if (room) {
            handleRoomMessage(msg)
        } else {
            handlePersonMessage(msg)
        }
    }
}