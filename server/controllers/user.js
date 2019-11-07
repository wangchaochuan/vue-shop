/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-10-31 14:29:32
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-08 06:11:41
 */
const userModel = require('../model/user.js');
const userController = {}

userController.findUserByName = function (userName, callback) {
    userModel.find({ userName: userName }, callback)
}
userController.login = function (req, res) {
    let userName = req.body.userName,
        password = req.body.password,
        query = userModel.find();
    query.and([{ userName: userName }, { password: password }]).exec((error, docs) => {
        if (error) {
            res.send({
                state: '9999',
                msg: '服务器内部错误！'
            })
            console.log(error);
        }
        res.send({
            state: '0000',
            msg: '执行成功',
            result: docs
        })
    })


}
userController.addUser = function (req, res) {
    let userName = req.body.userName,
        password = req.body.password,
        user = new userModel({
            userName,
            password,
            receiverInfo: [],
            shoppingCart: []
        });
    if(!userName||!password){
        res.send({
            state: '6666',
            msg: '用户名或密码不能为空!'
        })
    }
    userController.findUserByName(userName, (err, docs) => {
        if (err) {
            res.send({
                state: '9999',
                msg: '服务器内部错误，注册失败!'
            })
        }
        if (docs.length == 0) {
            user.save((error, result) => {
                if (error) {
                    res.send({
                        state: '9999',
                        msg: '服务器内部错误，注册失败!'
                    })
                }
                console.log(result, 'result');
                res.send({
                    state: '0000',
                    msg: '注册成功！'
                })
            })
        } else {
            res.send({
                state: '8888',
                msg: '用户名重复，注册失败！'
            })
        }
    })

}
userController.updateShoppingCartList = function (req, res) {
    let { userName, shoppingCartList } = req.body;
    userModel.updateOne({ userName }, { shoppingCartList }, (error, docs) => {
        if (error) {
            res.send({
                state: '9999',
                msg: '加入购物车失败！'
            })
        }
        res.send({
            state: '0000',
            msg: '加入购物车成功！'
        })
    })
}
userController.getShoppingCartList = function (req, res) {
    let userName=req.body.userName;
    userController.findUserByName(userName,(error,docs)=>{
        if(error){
            res.send({
                state:'9999',
                msg:'获取购物车清单失败！'
            })
        }
        console.log(docs);
        res.send({
            state:'0000',
            msg:'获取购物车清单成功！',
            data:docs[0].shoppingCartList
        })
    })
}
userController.updateReceiverInfo = function (req,res){
    let {userName,receiverInfo}=req.body;
    userModel.updateOne({ userName }, { receiverInfo }, (error, docs) => {
        if (error) {
            res.send({
                state: '9999',
                msg: '执行失败！'
            })
        }
        res.send({
            state: '0000',
            msg: '执行成功！'
        })
    })
}
userController.getUserInfo = function (req,res){
    let userName=req.body.userName;
    userController.findUserByName(userName,(error,docs)=>{
        if(error){
            res.send({
                state:'9999',
                msg:'获取用户信息失败！'
            })
        }
        console.log(docs);
        res.send({
            state:'0000',
            msg:'获取用户信息成功！',
            data:docs[0]
        })
    })
}
module.exports = userController;