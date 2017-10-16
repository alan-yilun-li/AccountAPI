const User = require('../../db').User

module.exports = function(req, res, next) {
	let token = req.get('Authorization')
	if (!token) {
		res.send({error: 1, errmsg: 'authentication token required'})
		return
	}
	User.findOne({ token: token })
	.then((result) => {
		if (result.token === token) {
			req.body.currentUser = result._id
			next()
		} else {
			res.send({error: 1, errmsg: 'invalid token'})
			return
		}
	})
	.catch((result) => {
		res.send({error: 1, errmsg: 'invalid token'})
		return
	})
}