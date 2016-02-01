import Auth from '../utils/auth.jsx'
import makeRequest from '../utils/makeRequest.jsx'
import EventList from '../components/events/EventList.jsx'
import Message from '../components/inputFields/message.jsx'

const UserPage = React.createClass({
    getInitialState(){
        return {
            events: [],
            message: {
                value: '',
                status: ''
            }
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
                    console.log(response)
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
                <Message message={this.state.message.value} className={this.state.message.status}/>
            </section>
        )
    }
})


export default UserPage
