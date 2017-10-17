const Promise = require('promise')
const Challenge = require('../../db').Challenge
const challengesPresenter = require('../presenters').challenges

/*
Holds functions called in the routes.js file that
manage users themselves.
*/

module.exports = {
	createChallenge: function createChallenge(req, res) {
		const challengeData = { title: req.body.title, userId: req.body.currentUser, subscribedUsers: [req.body.currentUser]}
		let newChallenge = new Challenge(challengeData)
		newChallenge.save().then((result) => {
      res.send({success: 1, challenge: challengesPresenter.present(result)})
    }).catch((err) => {
      res.send({error: 1, errmsg: err});
    })
	},

	getChallenge: function getChallenge(req, res) {
		Challenge.findOne({_id: req.params._id}).then((result) => {
			if (result.isPublic) {
				res.send({success: 1, challenge: challengesPresenter.present(result)})
			} else {
				res.send({error: 1, errmsg: 'private challenge you do not have access to'})
			}
		}).catch((err) => {
			res.send({error: 1, errmsg: err})
		})
	},

	updateChallenge: function updateChallenge(req, res) {
		const challengeData = { title: req.body.title, addSubscriptions: req.body.addSubscriptions, removeSubscriptions: req.body.removeSubscriptions}
		for (let key in challengeData) {
			if (!challengeData[key]) {
				delete challengeData[key]
			} else if (key != 'title') {
				challengeData[key] = JSON.parse(challengeData[key])
			}
		}
		Challenge.findOne({_id: req.params._id}).then((result) => {
			if (result.userId == req.body.currentUser) {
				let s = new Set()
				result.subscribedUsers.forEach((id) => {s.add(id)})
				if (challengeData.addSubscriptions) challengeData.addSubscriptions.forEach((id) => {s.add(id)});
				if (challengeData.removeSubscriptions) challengeData.removeSubscriptions.forEach((id) => {s.delete(id)});
				result.subscribedUsers = Array.from(s)
				if (challengeData.title) result.title = challengeData.title;

				result.save().then((result) => {
					res.send({success: 1, challenge: challengesPresenter.present(result)})
				}).catch((err) => {
					res.send({error: 1, errmsg: err.errmsg})
				})
			} else {
				res.send({error: 1, errmsg: 'you are not the owner of this challenge'})
			}
		}).catch((err) => {
			res.send({error: 1, errmsg: err.errmsg})
		})
	},

	deleteChallenge: function deleteChallenge(req, res) {
		Challenge.remove({_id: req.params._id}).then((result) => {
			const resultObj = JSON.parse(result)
      if (resultObj.n == 1) {
        res.send({success: result})
      } else {
        res.send({error: 'challenge does not exist'})
      }
		}).then((err) => {
			res.send({error: 1, errmsg: err.errmsg})
		})
	}
}
