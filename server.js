/**
 * http://usejsdoc.org/
 */
'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var	mongoose = require('./config/mongoose'),
	express = require('./config/express');
var db = mongoose();
var app = express();
app.listen(8080);

console.log('Server running at 8080');
module.exports = app;