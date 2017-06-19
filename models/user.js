'use strict';

const mongoose = require("./connect");


const userSchema = mongoose.Schema({

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

module.exports = mongoose.model('user', userSchema);