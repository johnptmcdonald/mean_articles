var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('mongoose').model('User')

// the done() callback here is used by passport internally, see this:
// https://github.com/jaredhanson/passport-local/blob/master/lib/strategy.js#L80
// it's a built-in function called 'verified' which can be called with an err and/or a user

module.exports = function(){

	passport.use(new LocalStrategy(function(username, password, done){
		// see? I'm console logging the username, password, and whatever this 'done' callback is
		// it turns out its a function called verified, that you can check out in the passport github.
		// If verified is successful, it runs a function from the original passport module called success()
		// https://github.com/jaredhanson/passport/blob/33075756a626999c6e2efc872b055e45ae434053/lib/middleware/authenticate.js#L199
		// otherwise it runs other functions from the original passport.
		console.log(arguments)
		
		User.findOne({
			username: username
		}, function(err, user){
			if(err){
				return done(err)
			} 
			if(!user){
				return done(null, false, { message: 'unknown user' })
			}
			if(!user.authenticate(password)){
				return done(null, false, { message: 'wrong password' })
			}

			return done(null, user)
		})
	}))

}