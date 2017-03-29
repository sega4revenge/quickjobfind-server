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

exports.getProfile = userid =>

    new Promise((resolve,reject) => {
        let ObjectId;
        ObjectId = require('mongodb').ObjectID;
        feed/*.aggregate([{
            $match : {
                iduser : ObjectId(userid)
            }
        }, {
            $lookup: {
                from: "users",
                localField: "iduser",
                foreignField: "_id",
                as: "user"
            }
        }])*/.find({ iduser: ObjectId(userid) })
            .populate('iduser')
            .exec(function (err, post) {
                if(err) throw err;
                console.log(post);


            })

            .then(users => resolve(users))

            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });