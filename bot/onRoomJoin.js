/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:13:16 
 * @Last Modified by: Darren Zhang
 * @Last Modified time: 2020-11-14 10:40:29
 */

const config = require('../config')
module.exports = async function onRoomJoin(room, inviteeList, inviter) {
    inviteeList.map(c => {
        if(config.myRoom.includes(room.owner().id)) {
            room.say(config.roomJoinReply, c)
        }
    })
}
