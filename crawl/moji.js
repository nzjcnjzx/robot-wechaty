/*
 * @Author: Darren Zhang 
 * @Date: 2020-11-14 10:47:18 
 * @Last Modified by:   Darren Zhang 
 * @Last Modified time: 2020-11-14 10:47:18 
 */
/**
 * 获取墨迹天气信息
 * https://tianqi.moji.com/
 *  今天天气{晴}，气温{7}-{22}摄氏度，{东风2级}，空气指数{87} 良，湿度{94%}，当前气温{11}摄氏度
 *  {天冷了，该加衣服了！}
 */
const Crawler = require('crawler');
const { trim } = require('../utils')
async function weather (cb) {
  let text = ''
  const weatherQueue = new Crawler({
    maxConnections: 1,
    debug: true,
    callback (err, { $ }, done) {
      if (err) {
        console.error(err)
      } else {
        const addr = $('.search_default em').text().mytrim().split('，').reverse().join('')
        const air = $('.wea_alert em').text()
        const curWeather = $('.wea_weather em').text().mytrim()
        const curWet = $('.wea_about span').text().mytrim()
        const curWin = $('.wea_about em').text().mytrim()
        const tips = $('.wea_tips em').text().mytrim()
        const $days = $('.days')
        const $lis = $days.eq(0).find('li')
        const day = $lis.eq(0).text().mytrim()
        const weather = $lis.eq(1).text().mytrim()
        const range = $lis.eq(2).text().mytrim().replace('/', '~')
        const wind = $lis.eq(3).text().mytrim()
        const level = $lis.eq(4).text().mytrim()
        const todayWeather = `${day}${weather}${range}${wind}${level}`
        text = `当前${addr}\n空气${air} 气温 ${curWeather}度 ${curWet} ${curWin}\n${todayWeather}\n${tips}`
        done();
      }
    }
  })
  weatherQueue.queue('https://tianqi.moji.com/weather/china/hubei/wuhan')
  weatherQueue.on('drain', () => {
    console.log(text)
    cb && cb(text)
  })
}

module.exports = {
  weather
}