import makeRequest from '../utils/makeRequest.jsx'

const AboutRegistrar = React.createClass({
    getDefaultProps(){
        return {
            className: "",
            userId: false,
            eventName: ""
        }
    },
    getInitialState(){
        return {
            user: {
                "email": "",
                "fullname": "",
                "bio": ""
            },
        }
    },
    componentDidMount(){
        this.getUserById()
    },
    getUserById(){
        let self = this

        let userId = self.props.userId
        let settings = {
            method: 'GET'
        }

        makeRequest('/api/v1/user/' + userId, settings)
            .then(function(response){
                if(response) {
                    self.setState({
                        user : response
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
                        value: 'Something went wrong.',
                        status: 'invalid'
                    }
                })
            })
    },
    render(){
        return (
            <section className={this.props.className}>
                <h3>Name: {this.state.user.fullname}</h3>
                <p>{this.state.user.bio}</p>
                <a href={'mailto:' + this.state.user.email + '?subject=Question about Event: ' + this.props.eventName } className="btn btn-primary btn-small">Contact Registrar</a>
            </section>
        )
    }
})

export default AboutRegistrar
