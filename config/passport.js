var passport = require('passport')
var mongoose = require('mongoose')

module.exports = function(){
	var User = mongoose.model('User')

	// middleware - user is serialized into a cookie when you log in or sign up
	passport.serializeUser(function(user, done) {
		console.log("serializing user")
		done(null, user.id);
	});

	// this is middleware - user is deserialized from the cookies every time
	passport.deserializeUser(function(id, done){
		console.log("deserializing user")
		User.findOne({
			_id: id
		}, '-password -salt', function(err, user){
			done(err, user)
		})
	})

	require('./strategies/local.js')()
	require('./strategies/facebook.js')()

}