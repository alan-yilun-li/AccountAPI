const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

module.exports = {
	User: mongoose.model('User', userSchema)
}