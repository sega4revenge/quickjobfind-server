// 'use strict';



// exports.getProfile = () =>

//     new Promise((resolve,reject) => {


//         feed.find().sort({timeStamp: -1})

//         .then(feeds => resolve(feeds))

//         .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

//     });
'use strict';
const product = require('../models/product');
const user = require('../models/user');

/*
exports.getProfile = userid =>

    new Promise((resolve,reject) => {
        let ObjectId;
        ObjectId = require('mongodb').ObjectID;
        user.find({ _id: ObjectId(userid)})
            .exec(function (err, post) {
                if(err) throw err;
                console.log(post);


            })

            .then(users => resolve(users[0]))
            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });*/
exports.getProfile = userid =>

    new Promise((resolve,reject) => {
        let ObjectId;
        ObjectId = require('mongodb').ObjectID;
        product.find({})
            .populate('user')
            .limit(5)
            .then(products => resolve(products[0]))
            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });