import Input from './inputFields/input.jsx'
import Label from './inputFields/label.jsx'
import Message from './inputFields/message.jsx'

import Form from './inputFields/form.jsx'

import Auth from '../utils/auth.jsx'
import makeRequest from '../utils/makeRequest.jsx'

import handleChange from '../mixins/handleChange.jsx'


const LoginForm = React.createClass({
    getInitialState(){
            return {
                email: {
                    name: 'email',
                    type: 'email',
                    value: ''
                },
                password: {
                    name: 'password',
                    type: 'password',
                    value: ''
                },
                message: ""
            }
    },
    handleChange,
    handleSubmit(e){
            e.preventDefault()
            if(this.state.email.value === '' && this.state.password.value === '') {
                this.setState({message: 'Please fill out all fields'})
            }
    },
    render(){
        return (
            <Form formNoValidate={true} onSubmit={this.handleSubmit}>
                <h3 className="center">Login</h3>
                <Label for="email" text="Email*">
                    <Input {...this.state.email} onChange={this.handleChange}/>
                    <Message message={this.state.email.message}/>
                </Label>
                <Label for="password" text="Password*">
                    <Input {...this.state.password} onChange={this.handleChange}/>
                    <Message message={this.state.password.message}/>
                </Label>
                <Message message={this.state.message} />
                <Input type="submit" value="Login" className="btn btn-primary"/>
            </Form>
        )
    }
})

export default LoginForm
