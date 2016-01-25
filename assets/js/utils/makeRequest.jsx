// global Fetch polyfill from CDN
import Auth from './auth.jsx'

// Check status and return response or throw error
function _checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		var error = new Error(response.statusText)
		error.response = response
		throw error
	}
}

// Helper function that return promise with data
function _parseJSON(response) {
	return response.json()
}

let defaultOptions = {
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
}

// Fetch token from localStorage
let token = Auth.getToken()

// If token exists update options header token with token string
if (token) defaultOptions.headers.Authorization = 'Bearer: ' + token

function makeRequest(endpoint, userOptions) {
    let options = Object.assign(defaultOptions, userOptions)

	return fetch(endpoint, options)
			.then(response => {
			    return response.json().then(json => {
			    	return response.ok ? json : Promise.reject(json)
			    })
			})
}

export default makeRequest
