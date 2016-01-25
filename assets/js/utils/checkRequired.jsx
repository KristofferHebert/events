function checkRequired(state){
    for (var key in state) {
        if(state.hasOwnProperty(key)){
            if(key.value == '' && key.required === true) {
                key.status = 'invalid'
                key.message = 'This field is required.'
            }
        }
    }
    return state
}

export default checkRequired
