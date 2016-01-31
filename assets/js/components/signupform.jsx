import Input from './inputFields/input.jsx'
import Label from './inputFields/label.jsx'
import Message from './inputFields/message.jsx'
import Textarea from './inputFields/textarea.jsx'
import Section from './section.jsx'
import Form from './inputFields/form.jsx'

import Auth from '../utils/auth.jsx'
import makeRequest from '../utils/makeRequest.jsx'
import handleChange from '../mixins/handleChange.jsx'
import validate from '../mixins/validate.jsx'
import { History } from 'react-router'


const SignupForm = React.createClass({
    mixins: [History],
    getInitialState(){
        return {
              email: {
                name: 'email',
                type: 'email',
                value: '',
                placeholder : 'Email@email.com',
                isValid: false,
                validate: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
              },
              password: {
                name: 'password',
                type: 'password',
                value: '',
                isValid: false,
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
              message: {
                  value: '',
                  status: ''
              }
            }
    },
    handleChange,
    validate,
    handleSubmit(event){
        event.preventDefault()
        var updateState = this.state.email

        if(this.state.email.value == '' || this.state.email.status == 'invalid'){
          updateState.message = 'Please provide valid email'
          this.setState(updateState)
        } else {
            let self = this
            let newUser = {
                email: this.state.email.value,
                fullname: this.state.fullname.value,
                bio:  this.state.bio.value,
                password: this.state.password.value
            }

            let settings = {
                method: 'POST',
                body: JSON.stringify(newUser),
            }

            makeRequest('/api/v1/user', settings)
                .then(function(response){
                    console.log(response)
                    if(response.code === "CREATED") {
                        self.setState({
                            message : {
                                value: 'Successfully created account.',
                                status: 'valid'
                            }
                        })

                        let User = {
                            email: newUser.email,
                            password: newUser.password
                        }

                        Auth.loginUser(User, function(err, response){
                            self.history.pushState(null, '/u')
                        })

                    } else {
                        self.setState({
                            message : {
                                value: 'Something went wrong.',
                                status: 'invalid'
                            }
                        })
                    }

                })
                .catch(function(error){
                    console.log(error)
                    self.setState({
                        message : {
                            value: 'Email is already registered.',
                            status: 'invalid'
                        }
                    })
                })

        }
    },
    render(){
        return (
            <Form formNoValidate={true} onSubmit={this.handleSubmit}>
                <h3 className="center">Sign up for Events</h3>
            <Label for="email" text="Email*">
                <Input {...this.state.email} onChange={this.handleChange}/>
                <Message message={this.state.email.message} status={this.state.email.status} />
            </Label>
            <Label for="password" text="Password*">
                <Input {...this.state.password} onChange={this.handleChange}/>
                <Message message={this.state.password.message} status={this.state.password.status}/>
            </Label>
            <p className="center">Password must contain 8 characters at least 1 Alphabet, 1 Number and 1 Special Character</p>
            <Section show={this.state.email.isValid && this.state.password.isValid}>
                <Label for="fullname" text="Name*">
                <Input {...this.state.fullname} onChange={this.handleChange}/>
                </Label>
                <Label for="Bio" text="Bio (optional)">
                <Textarea {...this.state.bio} rows="4" cols="50" maxLength="400" onChange={this.handleChange}/>
                <p className="mt0 fr small">400 characters max</p>
                </Label>
            <Section show={this.state.fullname.value !== ''}>
                <Input type="submit" value="Sign up" className="btn btn-primary centered"/></Section>
            </Section>
            <Message message={this.state.message.value} className={this.state.message.status}/>
            </Form>
        )
    }
})

export default SignupForm
