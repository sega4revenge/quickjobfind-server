'use strict';


const mongoose = require("./connect");
const Schema = require("mongoose/lib/schema");


const productSchema = mongoose.Schema({
    iduser           : { type: Schema.Types.ObjectId, ref: 'user' },
    productname      : String,
    price            : String,
    description      : String,
    images : [String]
});
 
mongoose.Promise = global.Promise;

module.exports = mongoose.model('product', productSchema);