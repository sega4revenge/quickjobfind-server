'use strict';


const mongoose = require("./connect");
const Schema = require("mongoose/lib/schema");


const productSchema = mongoose.Schema({
    iduser              : {type: Schema.Types.ObjectId, ref: 'user'},
    productid           : {type: Schema.Types.ObjectId, ref: 'product'},
    comment             : String,
    time                : String
});

mongoose.Promise = global.Promise;

module.exports = mongoose.model('comment', productSchema);