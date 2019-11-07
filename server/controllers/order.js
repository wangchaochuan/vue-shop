/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-11-08 05:15:22
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-08 06:42:19
 */
const fs = require('fs');
const orderModel = require('../model/order.js');
const orderController = {}

let getOrderId = function () {
    let time = new Date();
    let year = time.getFullYear();
    let months = (time.getMonth() + 1) >= 10 ? time.getMonth() + 1 : '0' + time.getMonth();
    let date = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();
    return year + '' + months + date + time.getTime();
}
orderController.createOrder = function (req, res) {
    let { productList, receiverInfo, totalPrice } = req.body;
    let orderId = getOrderId();
    let order = new orderModel({
        orderId,
        productList,
        receiverInfo,
        totalPrice,
        hasPayment:false
    })
    order.save((error,doc)=>{
        if(error){
            res.send({
                state:'8888',
                msg:'订单创建失败！'
            })
        }
        res.send({
            state:'0000',
            msg:'订单创建成功！',
            data:doc
        })
    })
}
orderController.updateState = function(req,res){
    let orderId=req.body.orderId;
    orderModel.updateOne({orderId},{hasPayment:true},(error)=>{
        if(error){
            res.send({
                state:'8888',
                msg:'支付失败！'+JSON.stringify(error)
            })
        }
        res.send({
            state:'0000',
            msg:'支付成功！'
        })
    })
}
module.exports = orderController