'use strict';

const user = new require('../models/user');
const bcrypt = new require('bcryptjs');
const request = require('request');

exports.push_mess = (message,deviceId) =>

    new Promise((resolve, reject) => {
        console.log(message);
		console.log(deviceId);
		request({
			url: 'https://fcm.googleapis.com/fcm/send',
			method: 'POST',
			headers: {
				'Content-Type' :' application/json',
				'Authorization': 'key=AIzaSyAgSMnyOiYANTLM1kamaTclhUGgj7wCu2I'
			},
			body: JSON.stringify(
				{ "data": {
					"message": message
				},
					"to" : "dT0HzvO4J-g:APA91bHHsYDB_9A5rfo7lmoRu0tpHN-AOA6629YaYycd2KqkxyUjog93RRp-JiK9VvPhYNJlMwWpilXI3aFsqq1rh24dRkXZ6YkcYjhbgalOuCfpRh9pXtSGTh44IBNpXtvPTnEtf3OB"
				}
			)
		}, function(error, response, body) {
			if (error) {
				console.error(error, response, body);
				resolve({message: 'ERROR 1 !'});
			}
			else if (response.statusCode >= 400) {
				console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body);
				resolve({message: 'ERROR 2 !'});

			}
			else {
				console.log('Done!')
				resolve({status: 201, message: 'SEND OK !'});
			}
		});
    });