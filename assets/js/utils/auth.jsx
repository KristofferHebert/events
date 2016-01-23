// Helper function to get current user after authenticating
var endpoint = '/api/v1/auth'
var Auth = {}

// Fetch user id
Auth.getId = function(){
    var user = Auth.getUser()
    return (user.id) ? user.id : false
}

// Fetch user token
Auth.getToken = function(){
    var user = Auth.getUser()
    return (user.token) ? user.token : false
}

// Fetch user data from localStorage
Auth.getUser = function(){
    var user = localStorage.getItem('user')
    if(user) return JSON.parse(user)
    return false
}

Auth.loginUser = function(userObject, cb){
    //Global fetch api

    if(!userObject.email || !userObject.password) throw new Error('Please provide credentials')

    var user = JSON.stringify(userObject)

    var settings = {
        method: 'POST',
        body: user,
        mode: 'cors'
    }

    fetch(endpoint, settings).then(function(response){

            if(response.ok){
                    console.log('login successful', response.statusText)

                    return response.json().then(function(data) {
                        Auth.setUser(data)
                        return cb(null, data)
                    })
            }

            console.log('login failed', response.statusText)
            return cb(null, response)

    })
    .catch(function(err){
        return cb(err)
    })
}

Auth.logoutUser = function(){
    if(Auth.getUser()){
        delete localStorage.user
        console.log('User logged out')
    }
}

// Used to populate localStorage.user with user data.
Auth.setUser = function(json){
    var user = JSON.stringify(json)
    localStorage.setItem('user', user)
    return user
}

// Check if user is logged in
Auth.isLoggedIn = function(){
    return (Auth.getUser()) ? true : false
}


module.exports = Auth
