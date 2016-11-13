/**
 * The express.js fle is where we confgure our Express application. 
 * 	This is where we add everything related to the Express confguration.
 */
'use strict';

var express = require('express'),
	session = require('express-session');


module.exports = function() {

	//creates a new instance of an Express application,
	var app = express();
	// Configure the 'session' middleware
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: "this is a secret"
	}));
	
	require('../app/routes/index.server.routes.js')(app);

	return app;
};
