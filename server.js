process.env.NODE_ENV = process.env.NODE_ENV || 'development'



// the config/express file returns a function
var express = require('./config/express')
var mongoose = require('./config/mongoose')
var passport = require('./config/passport')

// we have to call our mongoose() function before app
var db = mongoose()

var passport = passport()
// requiring config/express gave us a function we need to run to get the app that we have already configured
var app = express()



app.listen(3000)

module.exports = app;

console.log("Server running locally at port 3000")
