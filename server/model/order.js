/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-11-08 05:11:48
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-08 06:15:46
 */

const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let orderSchema = new Schema({
    orderId: String,
    productList: Object,
    receiverInfo: Object,
    totalPrice: Number,
    hasPayment:Boolean
})

module.exports = mongoose.model('order', orderSchema, 'order');