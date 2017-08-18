/**
 * Created by Sega on 29/03/2017.
 */
'use strict';
const mongoose = require('mongoose');

/*const options = {
	user: "sega",
	pass: "sega4deptrai",
	auth: {
		authdb: 'admin'
	}
};*/
mongoose.connect('mongodb://192.168.1.42:27017/quickjobfind'/*,options*/);
module.exports = mongoose;