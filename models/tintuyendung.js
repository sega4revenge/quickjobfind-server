/**
 * Created by Sega on 28/03/2017.
 */
'use strict';

const mongoose = require("./connect");
const tintuyendungSchema = mongoose.Schema({

    macv : String,
    matd             : String,
    tencv            : String,
    nganhNghe            : String,
    chucdanh   :String,
    mucluong    : String,
    diadiem        : String,
    motacv    : String,
    phucloi    : String,
    soluong    : String,
    bangcap : String,
    dotuoi : String,
    ngoaingu : String,
    gioitinh : String,
    yeucaukhac : String,
    tenkynang : String,
    hannophoso : String,
    ngaydang : String,
});

mongoose.Promise = global.Promise;

module.exports = mongoose.model('tintuyendung',tintuyendungSchema);


