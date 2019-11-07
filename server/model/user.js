/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-10-31 14:13:48
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-03 09:36:24
 */
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let userSchema = new Schema({
    userName: String,
    password: String,
    receiverInfo: Array,
    shoppingCartList: Array
})

module.exports = mongoose.model('user', userSchema, 'user');