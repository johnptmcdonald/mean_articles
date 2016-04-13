var express = require('express')
var morgan = require('morgan')
var compress = require('compression')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

module.exports = function(){
	var app = express()
	require('../app/routes/index.server.routes.js')(app)
	return app
}