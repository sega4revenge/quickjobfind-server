'use strict';
const FCM = require("fcm-node");

const fcm = new FCM("AIzaSyAgSMnyOiYANTLM1kamaTclhUGgj7wCu2I");
exports.push_mess = (message,deviceId) =>

    new Promise((resolve, reject) => {
		var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
			to : deviceId,

			data: {
				message: message
			}
		};


		fcm.send(message, function(err, response){
			if (err) {
				resolve({status: 201, message: 'User Registered Sucessfully !'});
			} else {
				reject({status: 409, message: 'Error !'});
			}
		});


    });