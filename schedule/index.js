/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:39:36 
 * @Last Modified by: Darren Zhang
 * @Last Modified time: yyyy-11-Mo 09:24:29
 */

const config = require('../config')
const { setSchedule } = require('../utils')
const { getOne, getOneImage, weather } = require('../crawl')
const { getQingyunkeMsg, getOnePoetrySong, getOnePoetry } = require('../sourceApi')

async function startSchedule(bot) {
    const me = await bot.Contact.find({ id: config.cardId })
    console.log('开启定时任务！', me.name())
    setSchedule('0 0 7 * *', async () => {
        await me.say('早上好！该起床了')
    })
    setSchedule('0 30 7 * *', () => {
        weather(async weatherMessage => {
            await me.say(weatherMessage)
        })
    })
    setSchedule('0 0 9 * *', async () => {
        await me.say(await getOne())
        await me.say(await getOneImage())
    })
    setSchedule('0 40 11 * *', async () => {
        await me.say('中午好！ 该去吃午饭了')
        await me.say(await getQingyunkeMsg('笑话'))
    })
    setSchedule('0 0 18 * *', async () => {
        await me.say('下班了！')
        await me.say(await getOnePoetrySong())
    })
    setSchedule('0 0 23 * *', async () => {
        await me.say('睡觉了!')
        await me.say(await getOnePoetry())
    })
}

module.exports = {
    startSchedule
}