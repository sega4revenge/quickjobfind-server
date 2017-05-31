'use strict';

const mongoose = require("./connect");


const locationSchema = mongoose.Schema({

    idlocation             : String,
    tintuyentdung            : { type: String, ref: 'tintuyendung',field: 'macv' },
    longitude            : String,
    latitude    :String,

 
});
 
mongoose.Promise = global.Promise;

module.exports = mongoose.model('location', locationSchema);