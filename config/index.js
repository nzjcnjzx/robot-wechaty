/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:14:06 
 * @Last Modified by: Darren Zhang
 * @Last Modified time: yyyy-11-Sa 09:45:02
 */
require('dotenv').config('./env');
const { appid, token } = process.env
module.exports = {
    appid,
    token,
    name: '小强',
    roomJoinReply: `欢迎加入👏👏👏`,
    enable: true,
    // 群主的ID， 只处理我是群主的群
    myRoom: ['wxid_7uzl4dyeo3vf12', 'wxid_9jznononkp7c21'],
    cardId: 'wxid_9jznononkp7c21'
}