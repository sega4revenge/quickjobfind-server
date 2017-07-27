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
const ObjectID = require('mongodb').ObjectID;
exports.getProfile = userid =>

    new Promise((resolve,reject) => {

        const obj_id = new ObjectID(userid);
        user.find({ _id: obj_id})
            .exec(function (err, post) {
                if(err) throw err;
                console.log(post);


            })

            .then(users => resolve(users[0]))
            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });