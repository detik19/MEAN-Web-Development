/**
 * http://usejsdoc.org/
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	passport.use(new LocalStrategy(function(username, password, done) {
		// Use the 'User' model 'findOne' method to find a user with the current username
		User.findOne({
			username: username
		}, function (err, user) {
				// If an error occurs continue to the next middleware
				if(err){
					return done(err);
				}
				// If a user was not found, continue to the next middleware with an error message
				if(!user){
					return done(null, false, {
						message:'Unknown user'
					});
				}
				
				if(!user.authenticate(password)){
					return done(null, false, {
						message:'invalid password'
					});
				}
				return done(null, user);
				
			}//end anonymous callback function
		);
	}));
};