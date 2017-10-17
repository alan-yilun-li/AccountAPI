const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

let challengeSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		sparse: true
	},
	userId: {
		type: Number,
		required: true
	},
	isPublic: {
		type: Boolean,
		default: true
	},
	subscribedUsers: {
		type: Array,
		required: true
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
})

challengeSchema.plugin(autoIncrement.plugin, 'Challenge')

module.exports = {
	Challenge: mongoose.model('Challenge', challengeSchema)
}