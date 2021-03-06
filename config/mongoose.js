/**
 * http://usejsdoc.org/
 */
'use strict';
var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	//use mongoose to connect to mongoDB
	var db = mongoose.connect(config.db);
	
	// Load the application model 
	require('../app/models/user.server.model');
	require('../app/models/article.server.model');
	
	return db;
};