/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:13:13 
 * @Last Modified by: Darren Zhang
 * @Last Modified time: 2020-11-16 00:03:39
 */
const crawl = require('../crawl')
const { FileBox, UrlLink, MiniProgram } = require("wechaty");
const { requestRobot, now } = require('../utils')
const config = require('../config')
const { getQingyunkeMsg, getOnePoetry, getOnePoetrySong } = require('../sourceApi')
const actions = new Map([
    [['0', '菜单'], getMenu],
    [['1', '武汉天气'], getWether],
    [['2', '图片'], getImage],
    [['3', '音乐'], getMusic],
    [['4', '电影'], getMovie],
    [['5', '小程序'], getMiniPrograme],
    [['6', '名片'], getCard],
    [['7', '笑话'], getJoke],
    [['8', '每日一句'], crawl.getOne],
    [['9', '诗'], getOnePoetry],
    [['10', '诗歌'], getOnePoetrySong],
])

async function robotReply (msg, bot) {
    const isText = msg.type() === bot.Message.Type.Text; // 是否是文字
    let rMsg = ''
    if (isText) {
        rMsg = await requestRobot(msg.text())
    } else {
        rMsg = '^_^'
    }
    return rMsg
}

async function getMenu () {
    const menu = [...actions.keys()].reduce((pre, cur, index) => {
        if (index == 0) {
            pre = pre + '回复以下数字或文字获取内容:\n' + '0、菜单'
        } else {
            pre = pre + cur.join('、')
        }
        if (index % 2 != 0) {
            pre = pre + '\n'
        } else {
            pre = pre + '\t'
        }
        return pre
    }, '')
    return menu
}

async function getWether () {
    return new Promise((resolve, reject) => {
        crawl.weather(async weatherMessage => {
            resolve(weatherMessage)
        })
    })
}

async function getImage () {
    const fileBox = FileBox.fromUrl(await crawl.getOneImage())
    return fileBox
}
async function getMusic () {
    const linkPayload = new UrlLink({
        description: '《笑纳》是周仁作词，古月作曲，韩珂编曲，花僮演唱的歌曲，发行于2020年8月26日。收录于同名专辑《笑纳》中',
        thumbnailUrl: 'https://p3fx.kgimg.com/stdmusic/20200824/20200824173937391910.jpg',
        title: '笑纳',
        url: 'https://webfs.yun.kugou.com/202011141844/76405addb860ffacd61ac77fb62cdcaa/G227/M05/04/08/Iw4DAF9EtSyAHni8AEKYmb_KItw819.mp3'
    })
    return linkPayload
}
async function getMovie () {
    const linkPayload = new UrlLink({
        description: '《致命黑兰》是奥利维尔·米加顿执导，佐伊·索尔达娜、迈克尔·瓦尔坦、马克斯·马蒂尼、詹迪·莫拉等主演的动作剧情片',
        thumbnailUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605356257957&di=282a4324904aae53e1aba6bf9ea01fee&imgtype=0&src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fphoto%2Fl%2Fpublic%2Fp2237249406.jpg',
        title: '致命黑兰',
        url: 'https://video.zhiding0603.com/20200920/3Du4DitJ/index.m3u8'
    })
    return linkPayload
}
async function getMiniPrograme () {
    const miniPrograme = new MiniProgram({
        appid: 'wxd65425733cce6898',
        description: '账单小程序',
        pagePath: 'pages/bill/list/index.html',
        title: '小记账单',
        username: 'gh_b8c9651ccffb@app',
        thumbKey: '9520b4ce9a370694796679db4b007b5c',
        thumbUrl: '30580201000451304f02010002047138303c02032f546b0204e22c306f02045faea8fa042a777875706c6f61645f777869645f37757a6c346479656f33766631323331365f313630353238323034320204010800030201000400'
    })
    return miniPrograme
}
async function getCard (bot) {
    const contactCard = await bot.Contact.find({ id: config.cardId })
    return contactCard
}
/**
 * 现在我把群消息和个人消息的内容的处理逻辑都变为相同的
 * 都是对特定的消息进行回复，其他消息先不回复
 * 对自己除了特定消息，其他消息不回复
 * @param {*} content 
 */
async function getMsgByContent (content, bot) {
    let message = null
    const action = Array.from(actions).filter(([key, value]) => key.includes(content))
    for (const [, value] of action) {
        message = await value(bot)
    }
    return message
}

async function getJoke () {
    return getQingyunkeMsg('笑话')
}

module.exports = bot => {
    return async function onMessage (msg) {
        const content = msg.text().trim()
        const from = msg.from()
        const to = msg.to()
        const room = msg.room()
        const isAtMe = await msg.mentionSelf()
        const hasIn = [...actions.keys()].reduce((pre, cur) => pre.concat(...cur), []).includes(content)
        if (msg.self() && !hasIn) return;
        let sendMsg = await getMsgByContent(content, bot)
        console.log('%s 来自%s的消息,发送给%s, \n内容是: %s 我回复的内容%s', now(), from.name(), to && to.name() || room.id, content, sendMsg)
        if (isAtMe && config.myRoom.includes(room.owner().id)) {
            return await room.say(sendMsg || '^_^', from)
        }
        sendMsg && await msg.say(sendMsg)
    }
}