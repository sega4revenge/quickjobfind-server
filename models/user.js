'use strict';
 
const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
const userSchema = mongoose.Schema({ 
 
    name             : String,
    email            : String, 
    namecompany            : String,
    phone            : String, 
    photoprofile    :String,
    hashed_password    : String,
    created_at        : String,
    type    : String,
    tokenfirebase : String,
    
 
});
 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://developserver.ga:27017/quickjobfind');
 
module.exports = mongoose.model('user', userSchema);