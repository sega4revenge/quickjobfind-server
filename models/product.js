'use strict';


const mongoose = require("./connect");
const Schema = require("mongoose/lib/schema");


const productSchema = mongoose.Schema({

    productname             : String,
    iduser             : { type: Schema.Types.ObjectId, ref: 'user' },
    price            : String,
    image: {
        image1: String,
        image2: String,
        image3: String,
        image4: String
    }
});
 
mongoose.Promise = global.Promise;

module.exports = mongoose.model('product', productSchema);