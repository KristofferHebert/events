import Auth from '../utils/auth.jsx'
import makeRequest from '../utils/makeRequest.jsx'
import EventList from '../components/events/EventList.jsx'

const UserPage = React.createClass({
    getInitialState(){
        return {
            events: []
        }
    },
    componentDidMount(){
        let self = this
        let settings = {
            method: 'GET'
        }

        let userId = Auth.getId()

        // Get events by user
        makeRequest('/api/v1/event?owner=' + userId, settings)
            .then(function(response){
                if(response) {
                    self.setState({
                        events : response
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
            <section>
                <h3>My Events</h3>
                <EventList events={this.state.events} />
            </section>
        )
    }
})


export default UserPage
