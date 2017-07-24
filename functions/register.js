'use strict';
 
const user = require('../models/user');
const bcrypt = require('bcryptjs');
 
exports.registerUser = (name, email, password,photoprofile,type,tokenfirebase) =>
 
    new Promise((resolve,reject) => {
          let hash;
        if (type==="1") {
            hash = "";
           
        }
        else
        {  const salt = bcrypt.genSaltSync(10);
             hash = bcrypt.hashSync(password, salt);
          
             
        }            
 
        const newUser = new user({
            
            name: name,
            email: email,
            phone            : "", 
            photoprofile    :  photoprofile,
            hashed_password: hash,
            type    :  type,
            tokenfirebase : tokenfirebase,
            created_at: new Date()
        });
        newUser.save()

 
        .then(() => resolve({ status: 201, message: 'User Registered Sucessfully !',user : newUser }))
 
        .catch(err => {
 
            if (err.code === 11000) {
                console.log(type);
                if(type==="1")
                    user.find({email: email})

                        .then(users => {

                            if (users.length === 0) {

                                reject({ status: 404, message: 'User Not Found !' });

                            } else {
                                users[0].photoprofile = photoprofile;
                                users[0].tokenfirebase = tokenfirebase;
                                users[0].save();
                                resolve({ status: 201, message: 'User Registered Sucessfully !',user : users[0] });

                            }
                        });
                else
                reject({ status: 409, message: 'User Already Registered !' });
 
            } else {
                reject ({ status: 500, message: 'Internal Server Error !' });
                throw err;

            }
        });
    });