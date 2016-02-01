import makeRequest from '../utils/makeRequest.jsx'
import Time from '../utils/Time.jsx'
import Section from '../components/section.jsx'
import ShareBar from '../components/sharebar.jsx'
import AboutRegistrar from '../components/aboutregistrar.jsx'

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
                owner: false,
                id: "",
                guest: "",
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

        let location = window.location.href

        return (
            <section >
                <section className="eventList padding mt">
                    <h2 className="mt0 large">{this.state.event.eventName}</h2>
                    <h3 className="bold"><Time iso={this.state.event.eventStart} /></h3>
                    <div>Ends at: <Time iso={this.state.event.eventEnd} /></div>
                    <p className="small">Host: {this.state.event.eventHost} <br /><span>Type: {this.state.event.eventType}<br />Guest(s): {this.state.event.guest}</span></p>
                    <p className="cb"><strong>Location</strong>: {this.state.event.location}</p>
                    <a href={"https://www.google.com/maps?q=" + this.state.event.location} className="btn btn-primary btn-small" target="_blank">Get Directions</a>
                    <Section show={this.state.event.aboutEvent !== '' && this.state.event.aboutEvent}>
                        <h4 className="mb0">About Event</h4>
                        <p>{this.state.event.aboutEvent} </p>
                    </Section>
                </section>
                <section className="eventList padding mt">
                    <Section show={this.state.event.owner !== '' && this.state.event.owner}>
                        <h2 className="mt0">About Event Registrar</h2>
                        <AboutRegistrar userId={this.state.event.owner} eventName={this.state.event.eventName}/>
                    </Section>
                </section>
                <ShareBar title={this.state.eventName} url={location}/>
            </section>
        )
    }
})


export default EventPage
