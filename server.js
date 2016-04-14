process.env.NODE_ENV = process.env.NODE_ENV || 'development'



// the config/express file returns a function
var express = require('./config/express')
var mongoose = require('./config/mongoose')

// we have to call our mongoose() function before app
var db = mongoose()

// which we then call to get the app that we have configured
var app = express()


app.listen(3000)

module.exports = app;

console.log("Server running locally at port 3000")
