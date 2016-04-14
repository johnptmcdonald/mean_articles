module.exports = {
	// development configurations here
	secret: "secret",
	db: "mongodb://localhost/mean-articles",
	facebook: {
		clientID: "1694485574172096",
		clientSecret: "d863ce019388987f3adfccdfb5602cb3",
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	}
}