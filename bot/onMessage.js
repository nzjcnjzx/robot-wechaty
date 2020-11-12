/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:13:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-11-12 23:35:26
 */
const crawl = require('../crawl')
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
function handlePersonMessage (msg) {
    const content = message.text().trim(); // 消息内容
    if(content == '天气') {
        crawl.weather(async weatherMessage => {
            await msg.say(weatherMessage)
        })
    }
}

module.exports = bot => {
    return async function onMessage (msg) {
        if (msg.self()) return;
        const room = msg.room(); // 是否是群消息
        if (room) {
            handleRoomMessage(msg)
        } else {
            handlePersonMessage(msg)
        }
    }
}