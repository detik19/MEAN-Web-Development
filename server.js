/**
 * http://usejsdoc.org/
 */
'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var	mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport= require('./config/passport');
var db = mongoose();
var app = express();

//Configure the Passport middleware
var passport =  passport();

app.listen(8080);

console.log('Server running at 8080');
module.exports = app;