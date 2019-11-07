/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-10-18 14:15:23
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-10-26 11:12:43
 */
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.js');

/* GET users listing. */
router.get('/getProductList', productController.findList);
module.exports = router;