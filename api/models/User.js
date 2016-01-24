/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var enableUnique = (process.env === "production") ? true : false

function hashPassword(user, next){
    if(user.password){
        user.password = EncryptionService.hashPassword(user.password)
    }

    next(null, user)
}

function removePasswordFromJSON(){
    var obj = this.toObject()
      delete obj.password
      return obj
}

module.exports = {

	attributes: {
		email: {
			type: 'string',
			required: true,
			unique: true,
			minLength: 5,
			maxLength: 35
		},
        fullname: {
            type: 'string',
            maxLength: 100
        },
        bio: {
            type: 'string',
            maxLength: 400
        },
		password: {
			type: 'string',
			required: true,
			minLength: 8,
			maxLength: 25
		},
		authorization: {
			type: 'integer',
			defaultsTo: 1
		},
        toJSON: removePasswordFromJSON
	},
    beforeUpdate: hashPassword,
    beforeCreate: hashPassword
}
