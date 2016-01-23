var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var salt = bcrypt.genSaltSync(10)

module.exports = {
	secret: sails.config.jwtSettings.secret,
	issuer: sails.config.jwtSettings.issuer,
	audience: sails.config.jwtSettings.audience,

	/**
	 * Hash the password field of the passed user.
	 */
	hashPassword: function(password) {
		if(!password) throw Error('Please provide password')
        return bcrypt.hashSync(password, salt)
	},

	/**
	 * Compare user password hash with unhashed password
	 * @returns boolean indicating a match
	 */
	comparePassword: function(password, hashedPassword) {
		if(!password || !hashedPassword) throw Error('Please provide password or hashedPassword')
		return bcrypt.compareSync(password, hashedPassword)
	},

	/**
	 * Create a token based on the passed user
	 * @param user
	 */
	createToken: function(user) {
        var u = user.toJSON()
		return jwt.sign({
				user: u
			},
			sails.config.jwtSettings.secret, {
				algorithm: sails.config.jwtSettings.algorithm,
				expiresIn: sails.config.jwtSettings.expiresIn,
				issuer: sails.config.jwtSettings.issuer,
				audience: sails.config.jwtSettings.audience
			}
		)
	}
}
