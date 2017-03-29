// 'use strict';

// const feed = require('../models/feed');

// exports.getProfile = () =>

//     new Promise((resolve,reject) => {


//         feed.find().sort({timeStamp: -1})

//         .then(feeds => resolve(feeds))

//         .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

//     });
'use strict';

const feed = require('../models/feed');

exports.getProfile =() =>

    new Promise((resolve,reject) => {
        let ObjectId;
        ObjectId = require('mongodb').ObjectID;
        feed.find()

            .then(users => resolve(users[0]))

            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });