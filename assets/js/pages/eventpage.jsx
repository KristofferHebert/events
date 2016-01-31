import makeRequest from '../utils/makeRequest.jsx'
import Time from '../utils/Time.jsx'
import Section from '../components/section.jsx'
const EventPage = React.createClass({
    getInitialState(){
        return {
            event: {
                createdAt: "",
                eventEnd: "",
                eventHost: "",
                eventName: "",
                eventStart: "",
                eventType: "",
                id: "",
                location: "",
                owner: "",
                updatedAt: "",
                aboutEvent: ""
            }
        }
    },
    componentDidMount(){
        let self = this
        let settings = {
            method: 'GET'
        }

        let eventId = this.props.params.eventId

        // Get events by user
        makeRequest('/api/v1/event/' + eventId, settings)
            .then(function(response){
                if(response) {
                    self.setState({
                        event : response
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
                <h2>{this.state.event.eventName} <span className="fr"><Time iso={this.state.event.eventStart} /></span></h2>
                <div className="tar">Ends at: <Time iso={this.state.event.eventStart} /></div>
                <p className="small">Host: {this.state.event.eventHost} <br /><span>Type: {this.state.event.eventType}</span></p>
                <p className="cb"><strong>Location</strong>: {this.state.event.location} (<a href={"https://www.google.com/maps?q=" + this.state.event.location} target="_blank">map</a>)</p>
                <Section show={this.state.event.aboutEvent !== ''}>
                    <p><strong>About Event</strong>: {this.state.event.aboutEvent} </p>
                </Section>
            </section>
        )
    }
})


export default EventPage
