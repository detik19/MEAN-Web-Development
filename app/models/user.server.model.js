/**
 * http://usejsdoc.org/
 */
'use strict';

var mongoose = require('mongoose'),
	crypto = require('crypto'),
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
		index: true,
		match: /.+\@.+\..+/
	},
	username: {
		type: String,
		trim: true,
		unique: true,
		required: true //This will validate the existence of the username feld when saving the document
	},
	password: {
		type:String,
		validate: [
		  function(password) {
			  return password.length >= 6;
		  },
		  'Password should be longer'
		]
	},
	// hash your password
	salt:{
		type:String
	},
	//the strategy used to register the user
	provider:{
		type: String,
		//validate 'provider' value existance
		required: 'Provider is required'
	},
	//the user identifer for the authentication strategy
	providerId: String,
	//store the user object retrievedfrom OAuth providers.
	providerData:{},
	created:{
		type: Date,
		default: Date.now
	}
//	role:{
//		type: String,
//		enum: ['Admin', 'Owner', 'User']
//	},
//	website:{
//		type: String,
//		set: function(url) {
//			// Use a setter property to validate protocol existance in 'website' field
//			if(!url){
//				return url;
//			}else{
//				if(url.indexOf('http://') !==0 && url.indexOf('https://')!==0){
//					url = 'http://'+url;
//				}
//				return url;
//				
//			}
//		}
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
//	}
	
	
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
//Use a pre-save middleware to hash the password
UserSchema.pre('save', function(next) {
	if(this.password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');
	
	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if(!err){
			if(!user){
				callback(possibleUsername);
			}
			else{
				return _this.findUniqueUsername(username, (suffix|| 0) + 1, callback);
			}
			
		}else{
			callback(null);
			
		}
	}
	);
};
UserSchema.statics.findOneByUsername = function(username, callback) {
	//use the findOne method to retrive a user document
	this.findOne({
		username: new RegExp(username, 'i')
	}, callback);
};

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
mongoose.model('User', UserSchema);

