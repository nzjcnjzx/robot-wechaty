/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:13:08 
 * @Last Modified by: Darren Zhang
 * @Last Modified time: 2020-11-14 10:40:23
 */

const { Friendship } = require("wechaty");
/**
 * 自动同意好友请求
 */
async function onFriendship(friendship) {
    if (friendship.type() === Friendship.Type.Receive) {
        await friendship.accept();
    }
}
module.exports = onFriendship
