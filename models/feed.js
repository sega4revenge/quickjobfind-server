/**
 * Created by Sega on 28/03/2017.
 */
'use strict';

const mongoose = require('mongoose');
const feedSchema = mongoose.Schema({
    id_sc : String,
    iduser             : String,
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
mongoose.connect('mongodb://developserver.ga:27017/quickjobfind');

module.exports = mongoose.model('feed',feedSchema);