var sendgrid = require('sendgrid')(sails.config.sendgrid_api)
var base = sails.config.base

module.exports = {
	sendResetPasswordEmail: function(user, cb) {

		var resetLink = base + "reset/" + user.id
        var message  = "Hello,<br /><br />" +

        "Sorry to hear your password has gone missing!(It happens to the best of us.)<br />" +
        "Here is a link to reset it: <a href='" + resetLink + "'>Reset your Password</a><br /><br />" +

        "Thanks!<br />" +
        "The Staystream Team"

        var payload = {
			to: user.email,
			from: 'noreply@staystream.com',
			subject: 'Password reset for staystream.com',
			html: message
		}

		sendgrid.send(payload, function(err, json) {
			if (err) {
				cb(err, null)
			}
			cb(null, json)
		})
	}
}
