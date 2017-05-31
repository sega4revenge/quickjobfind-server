// 'use strict';

// const feed = require('../models/feed');

// exports.getProfile = () =>

//     new Promise((resolve,reject) => {


//         feed.find().sort({timeStamp: -1})

//         .then(feeds => resolve(feeds))

//         .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

//     });
'use strict';

const location = require('../models/location');
const tintuyendung = require('../models/tintuyendung');
exports.getProfile = userid =>

    new Promise((resolve,reject) => {

        location.find({})
            .populate('macv')
            .exec(function (err, post) {
                if(err) throw err;
                console.log(post);


            })

            .then(tintuyendungs => resolve(tintuyendungs))
            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });