/**
 * http://usejsdoc.org/
 */
'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/*
 * defned your UserSchema object using the Schema constructor
 * 
 */
var UserSchema= new Schema({
	firstName: String,
	lastName: String,
	email: String,
	username: String,
	password: String
});

mongoose.model('User', UserSchema);