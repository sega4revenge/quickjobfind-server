'use strict';

const mongoose = require("./connect");
 
const Schema = mongoose.Schema;
 
const userSchema = mongoose.Schema({ 

    name             : String,
    email            : String,
    phone            : String, 
    photoprofile    :String,
    hashed_password    : String,
    created_at        : String,
    type    : String,
    tokenfirebase : String,
    createby : { type: Schema.Types.ObjectId, ref: 'feed' },
 
});
 
mongoose.Promise = global.Promise;

module.exports = mongoose.model('user', userSchema);