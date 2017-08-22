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


		fcm.send(message)
			.then(function(response){
				console.log("Successfully sent with response: ", response);
			})
			.catch(function(err){
				console.log("Something has gone wrong!");
				console.error(err);
			})

    });