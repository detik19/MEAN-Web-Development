/**
 * http://usejsdoc.org/
 */
'use strict';
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

module.exports= function(app){
	
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);
	
	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}));
	app.get('/signout',users.signout);
//	app.route('/users')
//		.post(users.create)
//		.get(users.list);
//	
//	/*
//	 *  In Express, adding a colon before a substring in a route definition 
//	 *  means that this substring will be handled as a request parameter. 
//	 * 
//	 */
//	app.route('/users/:userId')
//		.get(users.read)
//		.put(users.update)
//		.delete(users.delete);
	
	/*
	 * To handle the population of the req.user object, 
	 * 	you use the app.param() method that defines 
	 * 	a middleware to be executed before any other middleware 
	 * 	that uses that parameter
	 * 
	 * Here, the users.userById() method will be executed 
	 * before any other middleware registered with the userId parameter, 
	 * which in this case is the users.read() middleware.
	 */
	///app.param('userId', users.userByID);
	

};