// 'use strict';



// exports.getProfile = () =>

//     new Promise((resolve,reject) => {


//         feed.find().sort({timeStamp: -1})

//         .then(feeds => resolve(feeds))

//         .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

//     });
'use strict';
const product = require('../models/product');



exports.uploadproduct = (userid,image) =>

    new Promise((resolve,reject) => {

        let ObjectId;
        ObjectId = require('mongodb').ObjectID;
        product.find({iduser : ObjectId(userid)})
            .then(products => {



                if (products.length === 0) {
                    reject({ status: 404, message: 'Product iduser Not Found !' });
                } else {
                    products[0].images.push(image);
                    reject({ status: 200, message: 'Ok !' });
                }
            })
            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });