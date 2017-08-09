'use strict';

const product = require('../models/product');


exports.createproduct = (userid, prodctname, price, number, description, type) =>

    new Promise((resolve, reject) => {

        let newproduct;
        console.log(price);
        console.log(type);
        if(type === 1){
            newproduct = new product({
                iduser: userid,
                productname: prodctname,
                price: "5437377",
                number: number,
                description: description,
                type: type
            });
        }else {
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