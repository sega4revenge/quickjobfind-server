'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const multipart = require('multiparty');
const register = require('./functions/register');
const login = require('./functions/login');
const profile = require('./functions/profile');
const fs = require('fs'),
    url = require('url');
const password = require('./functions/password');
const config = require('./config/config.json');
const formidable = require('formidable');
const path = require('path');
const uploadDir = path.join('./uploads/');
module.exports = router => {

    router.get('/', (req, res) => {
        const query = url.parse(req.url, true).query;
        let pic;
        pic = query.image;

        //read the image using fs and send the image content back in the response
        fs.readFile('./uploads/' + pic, function (err, content) {
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                res.end("No such image");
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200,{'Content-type':'image/jpg'});
                res.end(content);
            }
        });
    });
 
    router.post('/authenticate', (req, res) => {


        const email = req.body.email;
        const password = req.body.password;
        const tokenfirebase = req.body.tokenfirebase;
 
        if (!email||!password||!tokenfirebase) {

            res.status(400).json({ message: 'Invalid Request !' });
 
        } else {

            login.loginUser(email, password,tokenfirebase)
 
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
 


            profile.getProfile("593e52da81988825a0c9962a")
 
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
    router.post('/upload', function(req, res){
        uploadMedia(req,res)
/*

        const form = new multipart.Form({uploadDir: './uploads'});

        form.parse(req, function(err, fields, files) {
            console.log(files);//list all files uploaded
            //put in here all the logic applied to your files.
            res.status(200).json({ message: 'Success !' });
        });*/

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


    function uploadMedia(req, res) { // This is just for my Controller same as app.post(url, function(req,res,next) {....
        const form = new formidable.IncomingForm();
        form.multiples = true;
        form.keepExtensions = true;
        form.uploadDir = uploadDir;
        form.parse(req, (err, fields, files) => {
            if (err) return res.status(500).json({ error: err });
            console.log(files);
            res.status(200).json({ uploaded: req.params.name , name : req.params.name})
        });
        form.on('fileBegin', function (name, file) {
            const [fileName, fileExt] = file.name.split('.');
            file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`)
        })
    }
    function checkToken(req) {
 
        const token = req.headers['x-access-token'];
 
        if (token) {
 
            try {
 
                  const decoded = jwt.verify(token, config.secret);
 
                  return decoded.message === req.params.id;
 
            } catch(err) {
 
                return false;
            }
 
        } else {
 
            return false;
        }
    }
}
