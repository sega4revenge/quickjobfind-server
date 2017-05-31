'use strict';

const mongoose = require("./connect");
const Schema = mongoose.Schema;

const locationSchema = mongoose.Schema({

    idlocation             : String,
    tintuyentdung            : { type: Schema.Types.ObjectId, ref: 'tintuyendung',field: 'macv' },
    longitude            : String,
    latitude    :String,

 
});
 
mongoose.Promise = global.Promise;

module.exports = mongoose.model('location', locationSchema);