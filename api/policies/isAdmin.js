var passport = require('passport')

module.exports = function(req, res, next) {
	passport.authenticate('jwt', function(error, user, info) {
		if (req.body.authorization === 5 && user.authorization !== 5) {
			return res.notAdmin(null, info && info.code, info && info.message)
		}
		req.user = user

		next()
	})(req, res)
}
