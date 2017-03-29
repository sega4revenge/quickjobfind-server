'use strict';
 
const user = require('../models/feed');
const bcrypt = require('bcryptjs');
 
exports.registerUser = (name, email, password,photoprofile,type,tokenfirebase) =>
 
    new Promise((resolve,reject) => {
          if (type=="1") {
            var hash = "";
           
        }
        else
        {  const salt = bcrypt.genSaltSync(10);
             var hash = bcrypt.hashSync(password, salt);
          
             
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
 
            if (err.code == 11000) {
 
                reject({ status: 409, message: 'User Already Registered !' });
 
            } else {
                reject ({ status: 500, message: 'Internal Server Error !' });
                throw err;

            }
        });
    });