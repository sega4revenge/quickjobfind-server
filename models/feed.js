/**
 * Created by Sega on 28/03/2017.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feedSchema = mongoose.Schema({
    id_sc : String,
    iduser             : [{ type: Schema.Types.ObjectId, ref: 'user' }],
    number_view            : String,
    status            : String,
    location   :String,
    position    : String,
    daystart        : String,
    dayfinish    : String,
    mode    : String,
    phone_event    : String,
    lg1 : String,
    lg2 : String,
    color : String,
    image : String,
    alarm : String,
    description : String,
    dayupdate : String,
});

mongoose.Promise = global.Promise;
const db  = mongoose.createConnection('mongodb://developserver.ga:27017/quickjobfind');

module.exports = db.model('feed',feedSchema);