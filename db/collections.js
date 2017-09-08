const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true,
		unique: true
	}
})

module.exports = {
	User: mongoose.model('User', userSchema)
}