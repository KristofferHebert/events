import Input from './inputFields/input.jsx'
import Label from './inputFields/label.jsx'
import Message from './inputFields/message.jsx'
import Textarea from './inputFields/textarea.jsx'
import Section from './section.jsx'
import Form from './inputFields/form.jsx'

import Auth from '../utils/auth.jsx'
import handleChange from '../mixins/handleChange.jsx'


const SignupForm = React.createClass({
    getInitialState(){
        return {
              email: {
                name: 'email',
                type: 'email',
                value: '',
                placeholder : 'Email@email.com',
                validate: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
              },
              password: {
                name: 'password',
                type: 'password',
                value: '',
                placeholder : 'Password',
                validate: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i
              },
              fullname: {
                name: 'fullname',
                type: 'text',
                value: '',
                placeholder : 'Name'
              },
              bio: {
                name: 'bio',
                type: 'textarea',
                value: '',
                placeholder : 'About me...'
              },
              eventName: {
                name: 'eventName',
                type: 'text',
                value: '',
                placeholder : 'Beth\'s 30th Birthday'
              },
              location: {
                name: 'location',
                type: 'text',
                value: '',
                placeholder : 'San Francisco, CA'
              },
              locate: {
                name: 'locate',
                type: 'button',
                value: 'Locate',
                placeholder : 'San Francisco, CA'
              },
              eventType: {
                name: 'eventType',
                type: 'text',
                value: '',
                placeholder : 'Birthday Party',
                list: 'eventType-list',
                options: ['Birthday Party', 'Conference Talk', 'Wedding', 'Other']
              },
              eventHost: {
                name: 'eventHost',
                type: 'text',
                value: '',
                placeholder : 'Your Name'
              },
              eventStart: {
                name: 'eventStart',
                type: 'datetime-local',
                value: ''
              },
              eventEnd: {
                name: 'eventStart',
                type: 'datetime-local',
                value: ''
              }

            }
    },
    handleChange,
    handleSubmit(event){
        event.preventDefault()
        var updateState = this.state.email

        if(this.state.email.value == '' || this.state.email.status == 'invalid'){
          updateState.message = 'Please provide valid email'
          this.setState(updateState)
        } else {
          updateState.message = 'Success'
          this.setState(updateState)
        }
    },
    validate(obj, regex, type){
          if(!obj.value.match(regex)) {
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
    },
    render(){
        return (
            <Form formNoValidate={true} onSubmit={this.handleSubmit}>
                <h3 className="center">Sign up for Events</h3>
            <Label for="email" text="Email*">
                <Input {...this.state.email} onChange={this.handleChange}/>
                <Message message={this.state.email.message}/>
            </Label>
            <Label for="password" text="Password*">
                <Input {...this.state.password} onChange={this.handleChange}/>
                <Message message={this.state.password.message}/>
            </Label>
            <p className="center">Password must contain 8 characters at least 1 Alphabet, 1 Number and 1 Special Character</p>
            <Section show={this.state.email.isValid && this.state.password.isValid}>
                <Label for="name" text="Name*">
                <Input {...this.state.fullname} onChange={this.handleChange}/>
                </Label>
                <Label for="Bio" text="Bio (optional)">
                <Textarea {...this.state.bio} rows="4" cols="50" maxLength="400" onChange={this.handleChange}/>
                </Label>
            <Section show={this.state.fullname.value !== ''}>
                <Input type="submit" value="Sign up" className="btn btn-primary"/></Section>
            </Section>
            </Form>
        )
    }
})

export default SignupForm
