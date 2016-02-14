import Input from './inputFields/input.jsx'
import Label from './inputFields/label.jsx'
import Message from './inputFields/message.jsx'

import Form from './inputFields/form.jsx'

import Auth from '../utils/auth.jsx'
import makeRequest from '../utils/makeRequest.jsx'

import handleChange from '../mixins/handleChange.jsx'
import validate from '../mixins/validate.jsx'
import { History } from 'react-router'


const LoginForm = React.createClass({
    mixins: [History],
    getInitialState(){
            return {
                email: {
                    name: 'email',
                    type: 'email',
                    value: '',
                    placeholder : 'Email@email.com',
                    isValid: false,
                    validate: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
                    autoFocus: true
                },
                password: {
                    name: 'password',
                    type: 'password',
                    placeholder : 'Password',
                    value: ''
                },
                message: {
                    value: '',
                    status: ''
                }
            }
    },
    handleChange,
    validate,
    handleSubmit(e){
        e.preventDefault()
        let self = this

        if(this.state.email.value === '' && this.state.password.value === '') {
            this.setState({
                message: {
                    value: 'Please fill out all fields',
                    status: 'invalid'
                }
            })
        } else {
            let User = {
                email: self.state.email.value,
                password: self.state.password.value
            }

            Auth.loginUser(User, function(err, response){
                if(err) throw err
                if(response.status == 401) {
                    return self.setState({
                        message: {
                            value: 'Email or Password is incorrect.',
                            status: 'invalid'
                        }
                    })
                }

                // Not sure how to improve this. Remove mixin?
                self.history.pushState(null, '/u')
                self.setState({message: ''})
            })
        }

    },
    render(){
        return (
            <Form formNoValidate={true} onSubmit={this.handleSubmit}>
                <h3 className="center">Login</h3>
                <Label for="email" text="Email*">
                    <Input {...this.state.email} id="email" onChange={this.handleChange}/>
                    <Message message={this.state.email.message}  status={this.state.email.status}/>
                </Label>
                <Label for="password" text="Password*">
                    <Input {...this.state.password}  id="password" onChange={this.handleChange}/>
                    <Message message={this.state.password.message} status={this.state.password.status}/>
                </Label>
                <Message message={this.state.message.value} className={this.state.message.status} />
                <Input type="submit" value="Login" className="btn btn-primary centered"/>
            </Form>
        )
    }
})

export default LoginForm
