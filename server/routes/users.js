/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-10-18 11:29:22
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-07 22:33:24
 */
var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.js');

/* GET users listing. */
router.post('/login', userController.login);
router.post('/register', userController.addUser);
router.post('/updateShoppingCartList', userController.updateShoppingCartList);
router.post('/getShoppingCartList', userController.getShoppingCartList);
router.post('/updateReceiverInfo', userController.updateReceiverInfo);
router.post('/getUserInfo', userController.getUserInfo);

module.exports = router;
