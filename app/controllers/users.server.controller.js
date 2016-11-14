/**
 * http://usejsdoc.org/
 */
'use strict';
//used the Mongoose module to call the model
//method that will return the User model you previously defned
var User = require('mongoose').model('User');

/*
 * create a controller method named create(), 
 * which you will later use to create new users. Using the new keyword, the create() method creates a new model instance, 
 * which is populated using the request body
 * 
 */
exports.create = function(req, res, next){
	var user = new User(req.body);
	//call the model instance's save() method 
	//that either saves the user and outputs the user object, 
	//or fail, passing the error to the next middleware.
	user.save(function(err) {
		if(err){
			return next(err);
		}else{
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if(err){
			return next(err);
		}else{
			res.json(users);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.user);
};

/*
 *  userById() method is the one responsible for populating the
 *  req.user object. 
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}, function(err, user) {
		if(err){
			return next(err);
		}else{
			req.user = user;
			next();
		}
		
	});
	
};

exports.update = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if(err){
			return next(err);
		}else{
			res.json(user);
		}
	});
};