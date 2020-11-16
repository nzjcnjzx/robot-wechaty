const { qingyunkeApi } = require('../config')
const axios = require('axios')


/**
 * 
 天气：msg=天气深圳
 中英翻译：msg=翻译i love you
 智能聊天：msg=你好
 笑话：msg=笑话
 歌词⑴：msg=歌词后来
 歌词⑵：msg=歌词后来-刘若英
 计算⑴：msg=计算1+1*2/3-4
 计算⑵：msg=1+1*2/3-4
 ＩＰ⑴：msg=归属127.0.0.1
 ＩＰ⑵：msg=127.0.0.1
 手机⑴：msg=归属13430108888
 手机⑵：msg=13430108888
 成语查询：msg=成语一生一世
 五笔/拼音：msg=好字的五笔/拼音
 * 
 * @param {*} msg 查询内容
 */
async function getQingyunkeMsg (msg) {
  try {
    const { data } = await axios.get(qingyunkeApi + encodeURI(msg))
    return data.content.replace(/[{br}]/g, '\n')
  } catch (error) {
    console.error(error)
  }

}

module.exports = {
  getQingyunkeMsg
}
