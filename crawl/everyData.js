const Crawler = require('crawler');
const { choice } = require('../utils')
function getOne () {
  return new Promise((resolve, reject) => {
    let text = ''
    const oneQueue = new Crawler({
      maxConnections: 1,
      callback (err, { $ }, done) {
        if (err) return reject(err);
        const $wrapper = $('.fp-one-cita-wrapper').first()
        text = $wrapper.find('a').text()
        done()
      }
    })
    oneQueue.queue('http://wufazhuce.com/')
    oneQueue.on('drain', () => {
      resolve(text)
    })
  });
}

function getOneImage () {
  return new Promise((resolve, reject) => {
    let srcs = []
    const oneQueue = new Crawler({
      maxConnections: 1,
      callback (err, { $ }, done) {
        if (err) return reject(err);
        const $imgs = $('.il_img')
        $imgs.each((index, li) => {
          const $img = $(li).find('img')
          srcs.push(`http:${$img.attr('src')}`)
        })
        done()
      }
    })
    oneQueue.queue('https://www.ivsky.com/tupian/ziranfengguang/')
    oneQueue.on('drain', () => {
      resolve(choice(srcs))
    })
  });
}

module.exports = {
  getOne,
  getOneImage
}