const User = require('../../db/collections').User

module.exports = function(req, res, next) {
	let token = req.query.token
	if (!token) {
		res.send({error: "authentication token required"})
		return
	}
	User.findOne({ username: req.params.username })
	.then((result) => {
		if (result.token === token) {
			next()
		} else {
			res.send({error: "invalid token"})
			return
		}
	})
}