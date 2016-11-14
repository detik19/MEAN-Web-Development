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
		.get(users.read);
	app.param('userId', users.userByID);
};