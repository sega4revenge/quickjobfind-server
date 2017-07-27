'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = (id, token, name, email, password, photoprofile, type, tokenfirebase) =>

    new Promise((resolve, reject) => {
        let hash;
        let newUser;
        console.log(type);
        if (type === "1") {
            newUser = new user({
                name: name,
                email: email,
                hashed_password: "",
                tokenfirebase: tokenfirebase,
                created_at: new Date(),
                facebook: {
                    id: id,
                    token: token,
                    name: name,
                    email: email
                }
            });

        }
        else if (type === "2") {
            newUser = new user({
                name: name,
                email: email,
                hashed_password: "",
                tokenfirebase: tokenfirebase,
                created_at: new Date(),
                google: {
                    id: id,
                    token: token,
                    name: name,
                    email: email
                }
            });

        }
        else {
            const salt = bcrypt.genSaltSync(10);
            hash = bcrypt.hashSync(password, salt);

            newUser = new user({
                name: name,
                email: email,
                hashed_password: hash,
                tokenfirebase: tokenfirebase,
                created_at: new Date(),

            });


        }


        newUser.save()


            .then(() => resolve({status: 201, message: 'User Registered Sucessfully !', user: newUser}))

            .catch(err => {

                if (err.code === 11000) {

                    if (type !== "0")
                        user.find({email: email})

                            .then(users => {

                                if (type === 1) {
                                    users[0].facebook.name = name;
                                    users[0].facebook.id = id;
                                    users[0].facebook.token = token;
                                    users[0].facebook.photoprofile = photoprofile;
                                    users[0].tokenfirebase = tokenfirebase;
                                    users[0].save();
                                    resolve({status: 201, message: 'User Registered Sucessfully !', user: users[0]});

                                } else {
                                    users[0].google.name = name;
                                    users[0].google.id = id;
                                    users[0].google.token = token;
                                    users[0].google.photoprofile = photoprofile;
                                    users[0].tokenfirebase = tokenfirebase;
                                    users[0].save();
                                    resolve({status: 201, message: 'User Registered Sucessfully !', user: users[0]});

                                }
                            });
                    else
                        reject({status: 409, message: 'User Already Registered !'});

                } else {
                    reject({status: 500, message: 'Internal Server Error !'});
                    throw err;

                }
            });
    });