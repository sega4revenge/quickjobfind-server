'use strict';
const FCM = require("fcm-node");

const fcm = new FCM("AIzaSyAgSMnyOiYANTLM1kamaTclhUGgj7wCu2I");
exports.push_mess = (msg,deviceId) =>

    new Promise((resolve, reject) => {
		const m = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
			registration_ids: ["dT0HzvO4J-g:APA91bHHsYDB_9A5rfo7lmoRu0tpHN-AOA6629YaYycd2KqkxyUjog93RRp-JiK9VvPhYNJlMwWpilXI3aFsqq1rh24dRkXZ6YkcYjhbgalOuCfpRh9pXtSGTh44IBNpXtvPTnEtf3OB", "frR-tTgnn-E:APA91bGdaf7qqI4oVAC4qEMgjYqU8NoIob2B8BaXnJnSVaw0bDnV0qVhzBfaRbMZ1xKKTxFH4rn8GOs46pGRE8x_IrRH-lBRXR0wMYp-LKVtUIsnf4IHaHIbbkC7mo-q9hvbVFPQ9pvv"],

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