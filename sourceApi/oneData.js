
const axios = require('axios')

// 一首诗
async function getOnePoetry () {
  const { data: { data } } = await axios.get('http://wrongmaker.top/json.php?appkey=CgNc0Jm8IgOWXbtbCKYtiD8eRF4AAAAAikLsZfEdI6AAAAAAAAAAAA==')
  const { title, author, paragraphs } = data;
  let poetry = `${title}  ${author}\n\n`
  paragraphs.split('。').forEach(text => {
    poetry += text + '\n'
  })
  return poetry;
}
// 一首诗经
async function getOnePoetrySong () {
  const { data } = await axios.get('http://wrongmaker.top/json.php?appkey=k7bkEkniEDscaUpCCrFCG+63Rl4AAAAAcpKNMNq69C0AAAAAAAAAAA==')
  const { title, chapter, section, content } = data.data;
  let poetry = `${title || '无标题'} \n${chapter} ${section}\n\n`
  content.split('。').forEach(text => {
    poetry += text + '\n'
  })
  return poetry;
}

// getOnePoetry().then(res => {
//   console.log(res)
// })

module.exports = {
  getOnePoetry,
  getOnePoetrySong
}
