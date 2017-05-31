'use strict';

const mongoose = require("./connect");

const Schema = mongoose.Schema;
const locationSchema = mongoose.Schema({

    idlocation             : String,
    macv            : { type: Schema.Types.String, ref: 'location' },
    longitude            : String,
    latitude    :String,

 
});
 
mongoose.Promise = global.Promise;

module.exports = mongoose.model('location', locationSchema);