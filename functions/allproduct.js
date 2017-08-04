'use strict';

const product = require('../models/product');
const bcrypt = require('bcryptjs');

exports.allproduct = () =>

    new Promise((resolve,reject) => {

        product.find()

            .then(products => {

                if (products.length === 0) {

                    reject({ status: 404, message: 'Product Not Found !' });

                } else {

                    return products;

                }
            })

            .then(product => {


                    resolve({ status: 200, product : product });

            })

            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

    });