'use strict';

const mongoose = require("./connect");


const userSchema = mongoose.Schema({
    name             : String,
    email            : { type: String, unique: true },
    hashed_password    : String,
    created_at        : String,
    photoprofile : String,
    tokenfirebase : String,
    facebook :{
        id : String,
        token : String,
        email: String,
        photoprofile    :String,
        name : String
    },
    google :{
        id : String,
        token : String,
        email: String,
        photoprofile    :String,
        name : String
    }

});
 
mongoose.Promise = global.Promise;

module.exports = mongoose.model('user', userSchema);