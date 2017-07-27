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

exports.getProfile = userid =>

    new Promise((resolve,reject) => {
        const ObjectId = require('mongoose').Types.ObjectId;
        user.find({})
            .exec(function (err, post) {
                if(err) throw err;
                console.log(post);


            })

            .then(users => resolve(users))
            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });