"use strict";

const product = new require("../models/product");
const comment = new require("../models/comment");
exports.allproduct = () =>

	new Promise((resolve, reject) => {
		const d = new Date();
		const timeStamp = d.getTime();
		console.log("TIMESTAMP: " + timeStamp);
		product.find({type: "1"}, {comment: 0})
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

exports.createproduct = (userid, prodctname, price, time, number, category, address, description, timestamp, type) =>

	new Promise((resolve, reject) => {

		let newproduct;

		console.log(type);
		if (type === 1) {
			console.log(price);
			newproduct = new product({
				user: userid,
				productname: prodctname,
				price: price,
				time: time,
				number: number,
				category: category,
				address: address,
				description: description,
				created_at: timestamp,
				type: type
			});
		} else {
			console.log(price);
			newproduct = new product({
				user: userid,
				productname: prodctname,
				price: "",
				time: "",
				number: number,
				category: category,
				address: address,
				description: description,
				created_at: timestamp,
				type: type
			});
		}


		newproduct.save()


			.then(() => {
				newproduct.populate("user", "_id name email images", function (err) {
					resolve({status: 201, message: "product Registered Sucessfully !", product: newproduct});
				});
			})


			.catch(err => {

				if (err.code === 11000) {


					reject({status: 409, message: "product Already Registered !"});

				} else {
					reject({status: 500, message: "Internal Server Error !"});
					throw err;

				}
			});
	});

exports.refreshcomment = (productid) =>
	new Promise((resolve, reject) => {

				let ObjectId;
				ObjectId = require("mongodb").ObjectID;
				comment.find({productid: ObjectId(productid)})
					.populate("user", "_id name photoprofile" )
					.then(comments => {

						if (comments.length === 0) {

							reject({status: 404, message: "Product Not Found !"});

						} else {

							return comments;

						}
					})
					.then(comment => {


						resolve({status: 201, message: "Comment Sucessfully !", comment: comment});

					})

			.catch(err => {

				if (err.code === 11000) {

					reject({status: 409, message: "Comment Already Registered !"});

				} else {
					reject({status: 500, message: "Internal Server Error !"});
					throw err;

				}
			});
	});

exports.addcomment = (userid, productid, content, time) =>

	new Promise((resolve, reject) => {

		let newcomment;


		newcomment = new comment({
			user: userid,
			productid: productid,
			content: content,
			time: time
		});

		newcomment.save()


			.then(() => {

				product.findByIdAndUpdate(
					productid,
					{$push: {"comment": newcomment._id}},
					{safe: true, upsert: true, new: true},
					function (err, model) {
						console.log(err);
					}
				);

						resolve({status: 201, message: "Comment Sucessfully !"});



			})

			.catch(err => {

				if (err.code === 11000) {

					reject({status: 409, message: "Comment Already Registered !"});

				} else {
					reject({status: 500, message: "Internal Server Error !"});
					throw err;

				}
			});
	});


exports.productdetail = (productid) =>

	new Promise((resolve, reject) => {

		let ObjectId;
		ObjectId = require("mongodb").ObjectID;

		product.find({_id: ObjectId(productid)})
			.populate({
				path: "user comment",
				options: { sort: { 'time': -1 } },
				// Get friends of friends - populate the 'friends' array for every friend
				populate: {path: "user", select: "_id name photoprofile" }
			})

			.then(products => {

				if (products.length === 0) {

					reject({status: 404, message: "Product Not Found !"});

				} else {

					return products[0];

				}
			})

			.then(product => {


				resolve({status: 200, product: product});

			})

			.catch(err => reject({status: 500, message: "Internal Server Error !"}));

	});

exports.allcomment = (productid) =>

	new Promise((resolve, reject) => {

		let ObjectId;
		ObjectId = require("mongodb").ObjectID;

		product.find({_id: ObjectId(productid)}, {comment: 1})
			.populate({
				path: "user comment",
				// Get friends of friends - populate the 'friends' array for every friend
				populate: {path: "user", select: "_id name photoprofile"}
			})
			.then(products => {

				if (products.length === 0) {

					reject({status: 404, message: "Product Not Found !"});

				} else {

					return products[0];

				}
			})

			.then(product => {


				resolve({status: 200, product: product});

			})

			.catch(err => reject({status: 500, message: "Internal Server Error !"}));

	});
exports.uploadproduct = (productid, image) =>

	new Promise((resolve, reject) => {

		console.log(productid);

		let ObjectId;
		ObjectId = require("mongodb").ObjectID;

		product.find({_id: ObjectId(productid)})
			.populate("user")
			.then(products => {

				if (products.length === 0) {

					reject({status: 404, message: "User Not Found !"});

				} else {

					return products[0];

				}
			})

			.then(product => {
				product.images.push(image);
				product.save();
			})
			.catch(err => reject({status: 500, message: "Internal Server Error !"}));

	});