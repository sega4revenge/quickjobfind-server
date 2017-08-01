'use strict';

const mongoose = require("./connect");


const productSchema = mongoose.Schema({

    productname             : String,
    iduser             : { type: Schema.Types.ObjectId, ref: 'user' },
    price            : String
});
 
mongoose.Promise = global.Promise;

module.exports = mongoose.model('product', productSchema);