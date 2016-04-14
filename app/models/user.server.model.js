var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var UserSchema = new Schema({
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
		required: true
	},
	password: {
		type: String,
		validate: [
			function(password){
				return password.length >= 6
			}, "Password must be longer than 5 characters"
		]
	},
	created: {
		type: Date,
		default: Date.now
	},
	website: {
		type: String, 
		get: function(url){
			if(!url){
				return url
			} else {
				if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
					url = 'http://' + url
				} 
				return url
			}
		}
	}
})

UserSchema.post('save', function(next){
	if(this.isNew){
		console.log("A new user was created")
	} else {
		console.log("A user updated their details")
	}
})

UserSchema.statics.findOneByUsername = function(username, callback){
	this.findOne({username: new RegExp(username, 'i')}, callback)
}

UserSchema.virtual('fullName').get(function(){
	return this.firstName + " " + this.lastName;
})

UserSchema.set('toJSON', {getters: true, virtuals: true})

mongoose.model('User', UserSchema)