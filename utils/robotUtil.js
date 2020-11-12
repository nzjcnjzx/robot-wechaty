/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:48:50 
 * @Last Modified by:   Darren Zhang 
 * @Last Modified time: 2020-11-12 16:48:50 
 */

const config = require('../config')
const urlencode = require("urlencode")
const request = require('request')
module.exports = {
    /**
     * @description 机器人请求接口 处理函数
     * @param {String} info 发送文字
     * @return {Promise} 相应内容
     */
    requestRobot(info) {
        return new Promise((resolve, reject) => {
            // 小思机器人  appid 可以申请
            let url = `https://api.ownthink.com/bot?appid=${config.appid}&userid=test&spoken=${urlencode(info)}`
            request(url, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    try {
                        var res = JSON.parse(body)
                        var status = res.message
                        console.log(`jsonObj: ${JSON.stringify(res)}`)
                    } catch (ee) {
                        var status = "faild"
                        console.log('捕获到json异常：', ee)
                    }

                    if (status == "success") {
                        try {
                            let send = res.data.info.text
                            // 免费的接口，所以需要把机器人名字替换成为自己设置的机器人名字
                            send = send.replace(/小思/g, config.name)
                            resolve(send)
                        } catch (e) {
                            resolve("xx电量不足，正在切换替代版本“小牛”中......切换失败")
                            console.log('捕获到text异常：', e)
                        }

                    } else {
                        resolve("又说那话，有本事你换一句呀")
                    }
                } else {
                    resolve("喂喂喂，你们家网线不通畅，小随听不到你讲话")
                }
            })
        })
    }
}