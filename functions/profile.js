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
        let ObjectId;
        ObjectId = require('mongodb').ObjectID;
        user.find({ _id: ObjectId("59799326f0ecb168bd7acfce")})
            .exec(function (err, post) {
                if(err) throw err;
                console.log(post);


            })

            .then(users => resolve(users[0]))
            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });