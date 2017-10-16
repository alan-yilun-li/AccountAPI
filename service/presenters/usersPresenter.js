module.exports = {
	present: function(user) {
		let u = Object.assign({}, user._doc)
		delete u.__v
		delete u.token
		delete u.password
		return u
	}
}