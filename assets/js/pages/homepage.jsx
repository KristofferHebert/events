'use strict'

// Fetch dependencies
import { Link, History } from 'react-router'
import Auth from '../utils/auth.jsx'

const HomePage = React.createClass({
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
                    <h2>Events helps you create and share events with your friends.</h2>
                    <p><Link to={'/signup'} className="btn btn-primary">Sign Up – It’s Free.</Link></p>
                </section>
                <section  className="tc">
                    <h2>Already have a account?</h2>
                    <p><Link to={'/login'}>Login...</Link></p>
                </section>
            </div>
        )
    }
})


export default HomePage
