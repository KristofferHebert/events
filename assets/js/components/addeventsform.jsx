import Input from './inputFields/input.jsx'
import Label from './inputFields/label.jsx'
import Message from './inputFields/message.jsx'
import Textarea from './inputFields/textarea.jsx'
import Datalist from './inputFields/datalist.jsx'
import Section from './section.jsx'
import Geosuggest from './inputFields/geolocate.jsx'
import Form from './inputFields/form.jsx'

import Auth from '../utils/auth.jsx'
import makeRequest from '../utils/makeRequest.jsx'
import handleChange from '../mixins/handleChange.jsx'
import validate from '../mixins/validate.jsx'
import { History } from 'react-router'


const AddEventsForm = React.createClass({
    mixins: [History],
    getInitialState(){
        return {
            eventName: {
              name: 'eventName',
              type: 'text',
              value: '',
              placeholder : 'Beth\'s 30th Birthday',
              required: true
            },
            location: {
              name: 'location',
              type: 'text',
              value: '',
              placeholder : 'San Francisco, CA',
              required: true
            },
            eventType: {
              name: 'eventType',
              type: 'text',
              value: '',
              placeholder : 'Birthday Party',
              list: 'eventType-list',
              options: ['Birthday Party', 'Conference Talk', 'Wedding', 'Other'],
              required: true
            },
            guest: {
              name: 'guest',
              type: 'text',
              value: '',
              placeholder : 'Guest List'
            },
            eventHost: {
              name: 'eventHost',
              type: 'text',
              value: '',
              placeholder : 'Your Name',
              required: true
            },
            eventStart: {
              name: 'eventStart',
              type: 'datetime-local',
              value: '',
              required: true
            },
            eventEnd: {
              name: 'eventEnd',
              type: 'datetime-local',
              value: '',
              required: true
            },
            aboutEvent: {
                name: 'aboutEvent',
                type: 'text',
                value: '',
                placeholder : ''
            },
            message: {
                value: '',
                status: ''
            },
            fixtures: [
              {label: 'Seattle, WA', location: {lat: 47.6062095, lng: -122.3320708}},
              {label: 'San Francisco, CA', location: {lat: 37.7749295, lng: -122.41941550000001}},
              {label: 'New York, NY', location: {lat: 40.712784, lng: -74.005941}},
              {label: 'Miami, FL', location: {lat: 25.7616798, lng: -80.19179020000001}}
            ]
        }
    },
    handleChange,
    validate,
    onSuggestSelect(suggest) {
        this.setState({
            location : {
                value: suggest.label
            }
        })
    },
    handleSubmit(event){
        event.preventDefault()
        let self = this

        let newEvent = {
            eventName: this.state.eventName.value,
            location: this.state.location.value,
            eventType: this.state.eventType.value,
            eventHost: this.state.eventHost.value,
            eventStart: new Date(this.state.eventStart.value).toISOString(),
            eventEnd: new Date(this.state.eventEnd.value).toISOString()
        }

        let settings = {
            method: 'POST',
            body: JSON.stringify(newEvent)
        }

        makeRequest('/api/v1/event', settings)
            .then(function(response){
                console.log(response)
                if(response.code === "CREATED") {
                    self.setState({
                        message : {
                            value: 'Successfully created event.',
                            status: 'valid'
                        }
                    })

                    console.log(response)

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
            <Form formNoValidate={true} onSubmit={this.handleSubmit}>
                <h3 className="center">Register Event</h3>
                <Label for="eventName" text="Event Name*">
                    <Input {...this.state.eventName} onChange={this.handleChange}/>
                </Label>
                <div className="half">
                    <Label for="eventHost" text="Event Host*">
                        <Input {...this.state.eventHost} onChange={this.handleChange}/>
                    </Label>
                </div>
                <div className="half last">
                    <Label for="eventType" text="Event Type*">
                        <Input {...this.state.eventType} list="eventType-list" onChange={this.handleChange}/>
                        <Datalist id="eventType-list"  options={this.state.eventType.options} onChange={this.handleChange} />
                    </Label>
                </div>
                <div className="half">
                    <Label for="eventStart" text="Event Starts*">
                        <Input {...this.state.eventStart} onChange={this.handleChange}/>
                    </Label>
                </div>
                <div className="half last">
                    <Label for="eventEnd" text="Event Ends*">
                        <Input {...this.state.eventEnd} onChange={this.handleChange}/>
                    </Label>
                </div>
                <div className="half">
                    <Label for="guest" text="Guest List">
                        <Input {...this.state.guest} onChange={this.handleChange}/>
                    </Label>
                </div>
                <div className="half last">&nbsp;</div>
                <div className="cf">
                    <Label for="location" text="Location*">
                        <Geosuggest
                        placeholder="Start typing!"
                        initialValue="Seattle, WA"
                        fixtures={this.state.fixtures}
                        onSuggestSelect={this.onSuggestSelect}
                        location={new google.maps.LatLng(53.558572, 9.9278215)}
                        radius="20" />
                    </Label>
                </div>
                <Label for="aboutEvent" text="About Event (optional)" className="cf">
                    <Textarea {...this.state.aboutEvent} className="mb" rows="6" cols="50" maxLength="400" onChange={this.handleChange}/>
                    <p className="fr mt0">Max chars 400</p>
                </Label>
                <Message message={this.state.message.value} className={this.state.message.status}/>
                <Input type="submit" value="Register Event" className="btn btn-primary centered"/>
            </Form>
        )
    }
})

export default AddEventsForm