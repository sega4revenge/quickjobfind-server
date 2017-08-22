'use strict';
const FCM = require("fcm-node");

const fcm = new FCM("AIzaSyAgSMnyOiYANTLM1kamaTclhUGgj7wCu2I");
exports.push_mess = (msg,deviceId) =>

    new Promise((resolve, reject) => {
		var m = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
			to : deviceId,

			data: {
				message: msg
			}
		};
		console.log(msg);

		fcm.send(m, function(err, response){
			if (err) {
				reject({status: 409, message: 'Error !'});
			} else {
				resolve({status: 201, message: 'User Registered Sucessfully !',response : response});

			}
		});


    });