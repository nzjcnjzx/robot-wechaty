/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:13:13 
 * @Last Modified by: Darren Zhang
 * @Last Modified time: yyyy-11-Sa 04:49:19
 */
const crawl = require('../crawl')
const { FileBox, UrlLink, MiniProgram } = require("wechaty");
const { requestRobot } = require('../utils')
const config = require('../config')
const superTexts = ['天气', '图片', '视频', '音乐', '小程序', '链接', '电影', '名片', '机器', '人', '菜单']

const menu = `回复对应数字或关键文字获取相关内容
0.天气
1.图片
2.视频
3.音乐
4.小程序
5.链接
6.电影
7.名片
8.机器   (机器人上线）
9.人       (机器人下线）
10.菜单`

/**
 * 处理群消息
 * 目前只回复自己建立的群
 * 含有关键字的不使用机器人
 * @param {object} msg 消息对象
 */
async function handleRoomMessage (msg, room, bot) {
    if(config.myRoom.includes(room.owner().id)) {
        const contact = msg.from();
        const isMentionSelf = await msg.mentionSelf()
        if(global.isRobot) {
            if(superTexts.includes(msg.text().trim())) {
                return handlePersonMessage(msg, bot)
            }
            const text = await robotReply(msg, bot)
            if(isMentionSelf) {
                await room.say(text, contact)
            } else {
                await room.say(text)
            }
        } else {
            handlePersonMessage(msg, bot)
        }
    }
}

/**
 * 处理个人消息
 * @param {object} msg 消息对象
 */
async function handlePersonMessage (msg, bot) {
    let content = msg.text().trim(); // 消息内容
    if(typeof parseInt(content) == 'number') {
        content = superTexts[parseInt(content)]
    }
    let flag = false;
    if (content == '菜单') {
        await msg.say(menu)
        flag = true
    }
    if (content == '天气') {
        crawl.weather(async weatherMessage => {
            await msg.say(weatherMessage)
        })
        flag = true
    }
    if (content == '图片') {
        const fileBox = FileBox.fromUrl('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3105295728,2665623167&fm=26&gp=0.jpg')
        await msg.say(fileBox);
        flag = true
    }
    if (content == '视频') {
        const fileBox = FileBox.fromUrl('https://vd4.bdstatic.com/mda-kkcfyc3zw0gvnnz9/v1-cae/sc/mda-kkcfyc3zw0gvnnz9.mp4?auth_key=1605248751-0-0-3fec4a511b7cb73e23baa351650845ee&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=8790_8')
        await msg.say(fileBox);
        flag = true
    }
    if (content == '音乐') {
        const fileBox = FileBox.fromUrl('https://webfs.yun.kugou.com/202011141844/76405addb860ffacd61ac77fb62cdcaa/G227/M05/04/08/Iw4DAF9EtSyAHni8AEKYmb_KItw819.mp3', '笑纳.mp3')
        await msg.say(fileBox);
        flag = true
    }
    if (content == '小程序') {
        const miniProgram = new MiniProgram({
            appid: 'wxd65425733cce6898',
            description: '账单小程序',
            pagePath: 'pages/bill/list/index.html',
            // thumbnailurl: 'http://phone.darrenzhangx.cn/images/watch-img-2.jpg',
            title: '小记账单',
            username: 'gh_b8c9651ccffb@app',
            thumbKey: '9520b4ce9a370694796679db4b007b5c',
            thumbUrl: '30580201000451304f02010002047138303c02032f546b0204e22c306f02045faea8fa042a777875706c6f61645f777869645f37757a6c346479656f33766631323331365f313630353238323034320204010800030201000400'
        })
        await msg.say(miniProgram)
        flag = true
    }
    if (content == '链接') {
        const linkPayload = new UrlLink({
            description: 'Netty',
            thumbnailUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/48MFTQpxichmmxEoXZ1w7eno72H2MQdx1WC6JiaVdYRmwAp4MCcQbctE2IE7jWqkWOlgMPqMBXVAdR1N46xEibvoQ/640?wx_fmt=jpeg&wxtype=jpeg&wxfrom=0',
            title: 'Netty',
            url: 'http://mp.weixin.qq.com/s?__biz=MzU2MDU3MzE1Mg==&mid=2247484375&idx=1&sn=5ee91b0a8607a1766b5212a23d3c9179&chksm=fc04bc58cb73354e798403bcc03e293149bb115a0755940e334c0fbe33d7c3b0b0797120a213&scene=0&xtrack=1#rd'
        })
        await msg.say(linkPayload)
        flag = true
    }
    if (content == '名片') {
        const contactCard = await bot.Contact.find({ name: 'Darren' })
        await msg.say(contactCard)
    }
    if (content == '电影') {
        const linkPayload = new UrlLink({
            description: '《致命黑兰》是奥利维尔·米加顿执导，佐伊·索尔达娜、迈克尔·瓦尔坦、马克斯·马蒂尼、詹迪·莫拉等主演的动作剧情片',
            thumbnailUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605356257957&di=282a4324904aae53e1aba6bf9ea01fee&imgtype=0&src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fphoto%2Fl%2Fpublic%2Fp2237249406.jpg',
            title: '致命黑兰',
            url: 'https://video.zhiding0603.com/20200920/3Du4DitJ/index.m3u8'
        })
        await msg.say(linkPayload)
        flag = true
    }

    // if (content == '好友') {
    //     // 查找群成员添加好友
    //     // const memberList = await room.memberList()
    //     // for (let i = 0; i < memberList.length; i++) {
    //     //     await bot.Friendship.add(member, 'Nice to meet you! I am wechaty bot!')
    //     // }
    //     const member = await bot.Contact.find({ name: 'Darren' })
    //     console.log(member)
    //     await bot.Friendship.add(member, 'hello')
    //     flag = true
    // }
    if (content == '机器') {
        global.isRobot = true
        await msg.say(`机器人${config.name}上线了`)
        return
    }
    if (content == '人') {
        global.isRobot = false
        await msg.say(`机器人${config.name}下线了`)
    }
    if (msg.self() || flag) return;
    global.isRobot &&  await msg.say(await robotReply(msg, bot))
}

async function robotReply (msg, bot) {
    const isText = msg.type() === bot.Message.Type.Text; // 是否是文字
    let rMsg = ''
    if (isText) {
       rMsg = await requestRobot(msg.text())
    } else {
        rMsg = '这个问题难到我了，要不换个问题！'
    }
    return rMsg
}
module.exports = bot => {
    return async function onMessage (msg) {
        const room = msg.room(); // 是否是群消息
        console.log(msg)
        if (msg.self()) return;
        if (room) {
            // 自己的消息，只回复特定的几个信息
            let message = msg.text().trim()
            if(typeof parseInt(message) == 'number') {
                message = superTexts[parseInt(message)]
            }
            if (msg.self()&&!superTexts.includes(message)) return;
            handleRoomMessage(msg, room, bot)
        } else {
            handlePersonMessage(msg, bot)
        }
    }
}