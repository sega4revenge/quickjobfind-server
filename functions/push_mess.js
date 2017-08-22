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
					"to" : deviceId
				}
			)
		}, function(error, response, body) {
			if (error) {
				console.error(error, response, body);
			}
			else if (response.statusCode >= 400) {
				console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body);
			}
			else {
				console.log('Done!')
			}
		});
    });