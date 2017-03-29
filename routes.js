'use strict';
 
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
 
const register = require('./functions/register');
const login = require('./functions/login');
const profile = require('./functions/profile');
const password = require('./functions/password');
const config = require('./config/config.json');
 
module.exports = router => {
 
    router.get('/a/', (req, res) => res.end('Welcome to Learn2Crack 123!'));
 
    router.post('/authenticate', (req, res) => {


        const email = req.body.email;
        const password = req.body.password;
        const tokenfirebase = req.body.tokenfirebase;
 
        if (!email||!password||!tokenfirebase) {
 
            res.status(400).json({ message: 'Invalid Request !' });
 
        } else {

            user.loginUser(email, password,tokenfirebase)
 
             .then(result => { 
 
                const token = jwt.sign(result, config.secret, { expiresIn: 1440 });
 
                res.status(result.status).json({ message: result.message, token: token,user : result.user });
 
            })
 
            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });
 
    router.post('/users', (req, res) => {
 
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const photoprofile = req.body.photoprofile;
        const type = req.body.type;
        const tokenfirebase = req.body.tokenfirebase;
        if (!name ) {
 
            res.status(400).json({message: 'Invalid Request !'});
 
        } else {
 
            register.registerUser(name, email, password,photoprofile,type,tokenfirebase)
 
            .then(result => {
 
                res.setHeader('Location', '/users/'+email);
                res.status(result.status).json({ message: result.message , user : result.user })
            })
 
            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });
 
    router.get('/data/:id', (req,res) => {
 


            profile.getProfile("58db760e2e96234cb70a5b03")
 
            .then(result => res.json(result))
 
            .catch(err => res.status(err.status).json({ message: err.message }));
 

    });
 
    router.put('/users/:id', (req,res) => {
 
        if (checkToken(req)) {
 
            const oldPassword = req.body.password;
            const newPassword = req.body.newPassword;
 
            if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {
 
                res.status(400).json({ message: 'Invalid Request !' });
 
            } else {
 
                password.changePassword(req.params.id, oldPassword, newPassword)
 
                .then(result => res.status(result.status).json({ message: result.message }))
 
                .catch(err => res.status(err.status).json({ message: err.message }));
 
            }
        } else {
 
            res.status(401).json({ message: 'Invalid Token !' });
        }
    });
 
    router.post('/users/:id/password', (req,res) => {
 
        const email = req.params.id;
        const token = req.body.token;
        const newPassword = req.body.password;
 
        if (!token || !newPassword || !token.trim() || !newPassword.trim()) {
 
            password.resetPasswordInit(email)
 
            .then(result => res.status(result.status).json({ message: result.message }))
 
            .catch(err => res.status(err.status).json({ message: err.message }));
 
        } else {
 
            password.resetPasswordFinish(email, token, newPassword)
 
            .then(result => res.status(result.status).json({ message: result.message }))
 
            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });
 
    function checkToken(req) {
 
        const token = req.headers['x-access-token'];
 
        if (token) {
 
            try {
 
                  var decoded = jwt.verify(token, config.secret);
 
                  return decoded.message === req.params.id;
 
            } catch(err) {
 
                return false;
            }
 
        } else {
 
            return false;
        }
    }
}
