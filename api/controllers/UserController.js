/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
    sendResetPasswordEmail: function(req, res){
        var params = req.allParams('email')

        User.findOneByEmail(params.email, function(err, user){
            if(err) return res.badRequest(err)

            // if no results return false
            if(!user) return res.json({'user': false})

            // send email
            EmailService.sendResetPasswordEmail(user, function(err, response){
                res.json({'user': response})
            })

        })

    },
    resetPassword: function(req, res){

        var userId = req.body.id
        var userPassword = req.body.password

        // Update password
        if(userId && userPassword){
            User.findOne({id: userId}).exec(function(err, user){
                if(err) return res.badRequest(err)

                // if no results return false
                if(!user) return res.notFound({'success': false, 'message': 'user not found'})

                user.password = userPassword

                user.save(function(err, user){
                    console.log('Password updated for', user.email)
                    return res.json({
                        success: true,
                        message: 'User password updated for ' + user.email
                    })
                })

            })
        } else {
            return res.json({
                success: false,
                message: 'missing id or password'
            })
        }
    }
}
