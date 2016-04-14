var users = require('../../app/controllers/users.server.controller')
var passport = require('passport')

module.exports = function(app){
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup)

	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}))

	app.get('/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/signin'
	}))

	app.get('/oauth/facebook/callback', passport.authenticate('facebook',  {
		failureRedirect: '/signin',
		successRedirect: '/'
	}))

	app.get('/signout', users.signout)

	app.route('/users')
		.post(users.create)
		.get(users.list)

	app.route('/users/:userId')
		.get(users.read)
		.put(users.update)
		.delete(users.delete)

	// this middleware runs ANY TIME a request has the userId parameter
	// this is a pretty useful pattern
	app.param('userId', users.userByID)
}