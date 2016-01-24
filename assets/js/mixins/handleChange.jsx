function handleChange(event){
  var updatedState = this.state
  var name = event.target.name
  updatedState[name].value = event.target.value

  if(updatedState[name].validate && updatedState[name].value !== ''){
      updatedState = this.validate(updatedState[name], updatedState[name].validate, updatedState[name].type)
  }

  this.setState(updatedState)

}

export default handleChange
