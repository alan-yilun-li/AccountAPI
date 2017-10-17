module.exports = {
	present: function(challenge) {
		let c = Object.assign({}, challenge._doc)
		delete c.__v
		return c
	}
}