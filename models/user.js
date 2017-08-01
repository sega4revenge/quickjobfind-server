'use strict';

const mongoose = require("./connect");
const Schema = require("mongoose/lib/schema");

const userSchema = mongoose.Schema({
    id : [{ type: Schema.Types.ObjectId, ref: 'product' }],
    name             : String,
    email            : { type: String, unique: true },
    hashed_password    : String,
    created_at        : String,
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