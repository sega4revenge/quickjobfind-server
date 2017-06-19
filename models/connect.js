/**
 * Created by Sega on 29/03/2017.
 */
'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/quickjobfind');
module.exports = mongoose;