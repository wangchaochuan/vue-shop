/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-10-25 10:37:51
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-10-31 14:37:58
 */

const productModel = require('../model/product.js');
const productController = {}

/**
 * @name: findList
 * @descripttion: 查询产品列表，分页查询
 * @param {type} 
 * @return: 
 */
productController.findList = function (req, res) {
    let { productName, priceLevel } = req.query;
    let page = +req.query.page;
    let pageSize = +req.query.pageSize;
    const query = productModel.find();
    if (productName) {
        let reg = new RegExp(productName);
        query.regex('productName', reg);
    }
    let minPrice = 0, maxPrice = 10000;
    switch (priceLevel) {
        case '1':
            maxPrice = 100;
            break;
        case '2':
            minPrice = 100;
            maxPrice = 500;
            break;
        case '3':
            minPrice=500;
            maxPrice=1000;
            break;
        case '4':
            minPrice = 1000;
            maxPrice = 2000;
            break;
        default :
            minPrice = 0;
            maxPrice = 10000;
            break;
    }
    query.where('salePrice').gte(minPrice).lt(maxPrice).skip((page - 1) * pageSize).limit(pageSize).exec((err, docs) => {
        if (err) {
            res.send({
                state: '9999',
                msg: '查询失败',
                error: err
            })
            return;
        };
        res.send({
            state: '0000',
            msg: '查询成功',
            result: docs
        })
    })
}

module.exports = productController;