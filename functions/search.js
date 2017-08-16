'use strict';

const product = new require('../models/product');
const bcrypt = new require('bcryptjs');

exports.mSearch = (searchkey,location, category,typeArrange) =>

	new Promise((resolve,reject) => {

		product.find({$text: { $search: "Arlit" } })
		//.find({
		//	productname:  /^.*\$searchkey.*$/i,
			//location: 	/^.*\$location.*$/i,
			//type: "1"
	//	})
			.populate("user")
			.then(products => {

				if (products.length === 0) {

					reject({status: 404, message: "Product Not Found !"});

				} else {

					return products;

				}
			})
			.then(product => {
				resolve({status: 200, listproduct: product});

			})
			.catch(err => reject({status: 500, message: "Internal Server Error !"}));
	});