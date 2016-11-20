/**
 * http://usejsdoc.org/
 */
'use strict';
//used the Mongoose module to call the model
//method that will return the User model you previously defned
var User = require('mongoose').model('User'),
	passport = require('passport');

/**
 * a private method that returns a unifed error message 
 * from a Mongoose error object. It is worth noticing 
 * that there are two possible errors here: a MongoDB indexing error 
 * handled using the error code and a Mongoose validation error 
 * handled using the err.errors object.
 */
//create a new error handling controller method
var getErrorMessage = function(err) {
	//define the error message variable
	var message = '';
	//if an internal mongodb error occurs set the message error
	if(err.code){
		switch (err.code) {
		case 11000:
		case 11001:
			message = "Username already exist";
			break;
		default://general error
			message= 'Something went wrong';
			
		}
	}
	else{
		for(var errName in err.errors){
			if(err.errors[errName].message){
				message =  err.errors[errName].message;
			} 
				
		}
	}
	return message;
	
};

exports.renderSignin = function(req, res, next) {
	if(!req.user){
		res.render('signin',{
			title: 'Sign-in form',
			messages: req.flash('error') || req.flash('info')	
		});
		
	}else{
		return res.redirect('/');
	}
};

exports.renderSignup = function(req, res, next) {
	if(!req.user){
		res.render('signup',{
			title: 'Sign-up Form',
			messages: req.flash('error')
			
		});
	}else{
		return res.redirect('/');
	}
};

exports.signup = function(req, res, next) {
	if(!req.user){
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';
		user.save(function(err) {
			if(err){
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/signup');
			}
			req.login(user, function(err) {
				if(err)	{
					return next(err);
				}
				return res.redirect('/');
			});
		});
		
	}else{
		return res.redirect('/');
	}
};

/*
 * The getErrorMessage() method is a private method that returns a unifed error 
 * message from a Mongoose error object, which is provided by the Passport module
 * 
 */
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};
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

exports.delete = function(req, res, next) {
	req.user.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.user);
		}
	});
};

exports.requiresLogin = function(req, res, next) {
	if(!req.isAuthenticated()){
		return res.status(401).send({
			message:'User is not logged in'
		});
	}
	next();
};

