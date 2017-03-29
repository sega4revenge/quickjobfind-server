'use strict';
 
const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
const userSchema = mongoose.Schema({ 
    id : { type: Schema.Types.ObjectId, ref: 'feed' },
    name             : String,
    email            : String,
    phone            : String, 
    photoprofile    :String,
    hashed_password    : String,
    created_at        : String,
    type    : String,
    tokenfirebase : String,
    
 
});
 
mongoose.Promise = global.Promise;
const db = mongoose.createConnection('mongodb://developserver.ga:27017/quickjobfind');
 
module.exports = db.model('user', userSchema);