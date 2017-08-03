'use strict';


const mongoose = require("./connect");
const Schema = require("mongoose/lib/schema");


const productSchema = mongoose.Schema({
    productid : { type: Schema.Types.ObjectId, unique: true },
    productname             : String,
    iduser             : { type: Schema.Types.ObjectId, ref: 'user' },
    price            : String,
    images : [String]
});
 
mongoose.Promise = global.Promise;

module.exports = mongoose.model('product', productSchema);