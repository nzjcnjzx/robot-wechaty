/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:13:13 
 * @Last Modified by: Darren Zhang
 * @Last Modified time: 2020-11-12 16:26:03
 */

/**
 * 处理群消息
 * @param {object} msg 消息对象
 */
function handleRoomMessage(msg) {

}
/**
 * 处理个人消息
 * @param {object} msg 消息对象
 */
function handlePersonMessage(msg) {

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