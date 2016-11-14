/**
 * http://usejsdoc.org/
 */
'use strict';
var users = require('../../app/controllers/users.server.controller');
module.exports= function(app){
	app.route('/users')
		.post(users.create)
		.get(users.list);
	
	/*
	 *  In Express, adding a colon before a substring in a route definition 
	 *  means that this substring will be handled as a request parameter. 
	 * 
	 */
	app.route('/users/:userId')
		.get(users.read)
		.put(users.update);
	
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
	app.param('userId', users.userByID);
};