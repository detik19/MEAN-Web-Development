/**
 * The express.js fle is where we confgure our Express application. 
 * 	This is where we add everything related to the Express confguration.
 */
'use strict';

var express = require('express'),
	session = require('express-session'),
	compress = require('compression'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');


module.exports = function() {

	//creates a new instance of an Express application,
	var app = express();
	
	if(process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}else if(process.env.NODE_ENV === 'production'){
		app.use(compress());
	}
	app.use(bodyParser.urlencoded({
		extended : true
	}));
	
	app.use(bodyParser.json());
	app.use(methodOverride());
	// Configure the 'session' middleware
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: "this is a secret"
	}));
	
	app.set('views', './app/views');
	app.set('view engine','ejs');
	
	
	require('../app/routes/index.server.routes.js')(app);

	/*
	 * The express.static() middleware takes one argument to determine the location of
	 *	the static folder. Notice how the express.static() middleware is placed below the
     * call for the routing fle. This order matters because if it were above it, Express would
     * frst try to look for HTTP request paths in the static fles folder	
	 * 
	 */
	app.use(express.static('./public'));
	return app;
};
