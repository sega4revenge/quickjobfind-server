'use strict';
const FCM = require("fcm-node");

const fcm = new FCM("AIzaSyAgSMnyOiYANTLM1kamaTclhUGgj7wCu2I");
exports.push_mess = (message,deviceId) =>

    new Promise((resolve, reject) => {
		console.log("send");
		const message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
			to: deviceId,

			data: {
				ar_message: message
			}
		};

		fcm.send(message)
			.then(() => resolve({status: 201, message: 'Successfully sent with response !'}))
			.catch(err => {

				if (err.code === 11000) {


						reject({status: 409, message: 'User Already Registered !'});

				} else {
					reject({status: 500, message: 'Internal Server Error !'});
					throw err;

				}
			});


    });