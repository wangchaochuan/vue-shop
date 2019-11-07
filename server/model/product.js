const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let productSchema = new Schema({
    productId: String,
    productImage: String,
    productName: String,
    productUrl: String,
    salePrice: Number
})

module.exports = mongoose.model('product', productSchema, 'product');