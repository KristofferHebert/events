function validate(obj, regex, type){
      if(!obj.value.match(regex) || obj.value === '' && obj.required === true) {
          obj.message = 'Invalid ' + type
          obj.status = 'invalid'
          obj.isValid = false

          return obj

      } else {
          obj.message = ''
          obj.status = 'valid'
          obj.isValid = true
          return obj
      }
}

export default validate
