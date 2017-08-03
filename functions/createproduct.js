'use strict';

const product = require('../models/product');


exports.createproduct = (userid, price) =>

    new Promise((resolve, reject) => {

        let newproduct;


        newproduct = new product({
            iduser: userid,
            price: price
        });


        newproduct.save()


            .then(() => resolve({status: 201, message: 'product Registered Sucessfully !', product: newproduct}))

            .catch(err => {

                if (err.code === 11000) {


                        reject({status: 409, message: 'product Already Registered !'});

                } else {
                    reject({status: 500, message: 'Internal Server Error !'});
                    throw err;

                }
            });
    });