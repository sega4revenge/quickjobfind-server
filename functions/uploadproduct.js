// 'use strict';



// exports.getProfile = () =>

//     new Promise((resolve,reject) => {


//         feed.find().sort({timeStamp: -1})

//         .then(feeds => resolve(feeds))

//         .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

//     });
'use strict';
const product = require('../models/product');
const mongoose = require("mongoose");



exports.uploadproduct = (userid,image) =>

    new Promise((resolve,reject) => {



        product.find({iduser : userid})
            .populate('iduser')
            .then(products => {

                if (products.length === 0) {

                    reject({ status: 404, message: 'User Not Found !' });

                } else {

                    return products[0];

                }
            })

            .then(product => {
                product.images.push(image);
                product.save();
            })
            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });