/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport')

function handlePassportAuth(req, res, error, user, info) {
	if (error) return res.serverError(error)
	if (!user) return res.unauthorized(null, info && info.code, info && info.message)

	return res.ok({
		token: EncryptionService.createToken(user),
		id: user.id
	})
}

module.exports = {
	index: function login(req, res) {
		passport.authenticate('local',
			handlePassportAuth.bind(this, req, res))(req, res)
	}
}
