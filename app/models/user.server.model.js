/**
 * http://usejsdoc.org/
 */
'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/*
 * defned your UserSchema object using the Schema constructor
 * 
 * Notice how the created feld is added and its default value defned
 * 
 * From now on, every new user document will be created 
 * with a default creation date that represents the moment the document was created
 */
var UserSchema= new Schema({
	firstName: String,
	lastName: String,
	email: String,
	username: String,
	password: String,
	created:{
		type: Date,
		default: Date.now
	}
});

mongoose.model('User', UserSchema);