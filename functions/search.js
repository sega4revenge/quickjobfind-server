'use strict';

const product = new require('../models/product');
const bcrypt = new require('bcryptjs');

exports.mSearch = (searchkey,location, category,typeArrange) =>

	new Promise((resolve,reject) => {

		product.find({type: "1"})

		//product.find({})//, "location": /^.*\$location.*$/i , "category": /^.*\$category.*$/i

			.then(product => {

				if (product.length === 0) {

					reject({ status: 404, message: 'User Not Found !' });

				} else {
					return product;
				}
			})
	});