'use strict';

const product = new require('../models/product');
const bcrypt = new require('bcryptjs');

exports.allproduct = () =>

    new Promise((resolve, reject) => {

        product.find({type: "1"})
            .populate('iduser')
            .then(products => {

                if (products.length === 0) {

                    reject({status: 404, message: 'Product Not Found !'});

                } else {

                    return products;

                }
            })

            .then(product => {


                resolve({status: 200, listproduct: product});

            })

            .catch(err => reject({status: 500, message: 'Internal Server Error !'}));

    });

exports.createproduct = (userid, prodctname, price, number, description, type) =>

    new Promise((resolve, reject) => {

        let newproduct;

        console.log(type);
        if (type === 1) {
            console.log(price);
            newproduct = new product({
                iduser: userid,
                productname: prodctname,
                price: price,
                number: number,
                description: description,
                type: type
            });
        } else {
            console.log(price);
            newproduct = new product({
                iduser: userid,
                productname: prodctname,
                price: "",
                number: number,
                description: description,
                type: type
            });
        }


        newproduct.save()


            .then(() => {
                newproduct.populate('iduser', '_id name email images', function (err) {
                    resolve({status: 201, message: 'product Registered Sucessfully !', product: newproduct})
                });
            })


            .catch(err => {

                if (err.code === 11000) {


                    reject({status: 409, message: 'product Already Registered !'});

                } else {
                    reject({status: 500, message: 'Internal Server Error !'});
                    throw err;

                }
            });
    });

exports.productdetail = () =>

    new Promise((resolve, reject) => {

        let ObjectId;
        ObjectId = require('mongodb').ObjectID;

        product.find({_id: ObjectId(productid)})
            .populate('iduser')
            .then(products => {

                if (products.length === 0) {

                    reject({status: 404, message: 'Product Not Found !'});

                } else {

                    return products[0];

                }
            })

            .then(product => {


                resolve({status: 200, product: product});

            })

            .catch(err => reject({status: 500, message: 'Internal Server Error !'}));

    });

exports.uploadproduct = (productid, image) =>

    new Promise((resolve, reject) => {

        console.log(productid);

        let ObjectId;
        ObjectId = require('mongodb').ObjectID;

        product.find({_id: ObjectId(productid)})
            .populate('iduser')
            .then(products => {

                if (products.length === 0) {

                    reject({status: 404, message: 'User Not Found !'});

                } else {

                    return products[0];

                }
            })

            .then(product => {
                product.images.push(image);
                product.save();
            })
            .catch(err => reject({status: 500, message: 'Internal Server Error !'}))

    });