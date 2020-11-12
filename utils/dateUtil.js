/*
 * @Author: Darren 
 * @Date: 2020-11-12 16:32:58 
 * @Last Modified by: Darren Zhang
 * @Last Modified time: 2020-11-12 16:34:57
 */

const moment = require('moment')
module.exports = {
    formatDate(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
}