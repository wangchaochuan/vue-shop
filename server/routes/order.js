/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-11-08 05:13:36
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-08 06:42:33
 */
var express = require('express');
var router = express.Router();
const orderController = require('../controllers/order.js');

/* GET users listing. */
router.post('/createOrder', orderController.createOrder);
router.post('/updateState', orderController.updateState);


module.exports = router;