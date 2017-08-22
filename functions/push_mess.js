'use strict';
const FCM = require("fcm-node");

const fcm = new FCM("AIzaSyAgSMnyOiYANTLM1kamaTclhUGgj7wCu2I");
exports.push_mess = (msg,deviceId) =>

    new Promise((resolve, reject) => {
		const m = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
			registration_ids: ["dT0HzvO4J-g:APA91bHHsYDB_9A5rfo7lmoRu0tpHN-AOA6629YaYycd2KqkxyUjog93RRp-JiK9VvPhYNJlMwWpilXI3aFsqq1rh24dRkXZ6YkcYjhbgalOuCfpRh9pXtSGTh44IBNpXtvPTnEtf3OB", "fTed3-MBE9U:APA91bGm9lzrdn2341mCJsumZqA6Ui9rqHOjJTW7Br_Z_YZqdHaFiiclfZ6q2FMjTpZxMXRTVx7hYs8YFDFYy5S3JGAIjjTXes14cSEHCu7rVo_BouYrjdQzgUd859sKFXPyxfQfgRev"],

			data: {
				message: msg
			}
		};
		console.log(msg);

		fcm.send(m, function(err, response){
			if (err) {
				console.log(err);
				reject({status: 409, message: 'Error !'});
			} else {
				console.log(response);
				resolve({status: 201, message: 'User Registered Sucessfully !',response : response});

			}
		});


    });