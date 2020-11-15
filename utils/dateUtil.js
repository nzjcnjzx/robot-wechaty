/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:32:58 
 * @Last Modified by: Darren Zhang
 * @Last Modified time: 2020-11-15 10:44:24
 */

const moment = require('moment')
module.exports = {
    formatDate(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    now() {
        return moment().format('YYYY-MM-DD HH:mm:ss')
    }
}