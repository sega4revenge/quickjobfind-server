// 'use strict';
 
// const feed = require('../models/feed');

// exports.getProfile = () =>
 
//     new Promise((resolve,reject) => {


//         feed.find().sort({timeStamp: -1})
 
//         .then(feeds => resolve(feeds))
 
//         .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))
 
//     });
'use strict';
 
const user = require('../models/user');
 
exports.getProfile = email => 
 
    new Promise((resolve,reject) => {
 
        user.find({ email: email }, { name: 1, email: 1, created_at: 1, _id: 0 })
 
        .then(users => resolve(users[0]))
 
        .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))
 
    });