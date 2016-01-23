'use strict'

// Fetch dependencies
import { Link, History } from 'react-router'
import Signup from '../components/signup.jsx'
import Login from '../components/login.jsx'
import Auth from '../utils/auth.jsx'


var HomePage = React.createClass({
    mixins: [History],
    componentDidMount(){
        if(Auth.isLoggedIn()){
            this.history.pushState(null, '/u')
        }
    },
    render(){
        return (
            <div>
                <section className="section tc">

                    <h2>Staystream is a free idea journal. It helps you build the habit of writing ideas down daily.</h2>
                    <h3>Sign Up – It’s Free.</h3>
                    <Signup className="tc"/>

                </section>
                <div  className="tc">
                    <h2>Login</h2>
                    <Link to={'/login'} className="centered">Click here to login</Link>
                </div>
            </div>
        )
    }
})


module.exports = HomePage
