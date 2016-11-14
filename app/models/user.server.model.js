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
	email: {
		type: String,
		index: true
	},
	username: {
		type: String,
		trim: true,
		unique: true
	},
	password: String,
	created:{
		type: Date,
		default: Date.now
	},
	website:{
		type: String,
		set: function(url) {
			// Use a setter property to validate protocol existance in 'website' field
			if(!url){
				return url;
			}else{
				if(url.indexOf('http://') !==0 && url.indexOf('https://')!==0){
					url = 'http://'+url;
				}
				return url;
				
			}
		}
//		get: function(url) {
//			if(!url){
//				return url;
//			}else{
//				if(url.indexOf('http://') !==0 && url.indexOf('https://')!==0){
//					url='http://'+url;
//				}
//				return url;
//			}
//			
//		}
	}
	
});

//Set the 'fullname'virtual property
/*
 * add a virtual attribute named fullName 
 * to your UserSchema,
 * 
 */
UserSchema.virtual('fullName').get(function() {
	return this.firstName+' '+this.lastName;
}).set(function(fullName) {
	var splitName= fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

mongoose.model('User', UserSchema);
/*
 * This will force Mongoose to include getters when
 * converting the MongoDB document to a JSON representation and will allow the
 * output of documents using res.json() to include the getter's behavior.
 * 
 */
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true //confgured your schema to include virtual attributes when converting the MongoDB document to a JSON representation
	
});