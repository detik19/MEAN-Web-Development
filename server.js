/**
 * http://usejsdoc.org/
 */
'use strict';

var express = require('./config/express');
var app = express();
app.listen(8080);

console.log('Server running at 8080');
module.exports = app;