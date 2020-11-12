/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:14:06 
 * @Last Modified by: Darren Zhang
 * @Last Modified time: 2020-11-12 17:04:16
 */
require('dotenv').config('./env');
const { appid, token } = process.env
module.exports = {
    appid,
    token,
    name: '小强',
    roomJoinReply: `欢迎加入👏👏👏!`,
    enable: true
}