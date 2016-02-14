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
              required: true,
              autoFocus: true
            },
            location: {
              name: 'location',
              type: 'text',
              value: 'Seattle, WA',
              placeholder : 'Seattle, WA',
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
              placeholder : 'Guest List',
              required: true
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
              required: true,
              message: {
                  value: "",
                  status: ""
              }
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
    hasValidDates(){
        var startDateTime = new Date(this.state.eventStart.value)
        var endDateTime = new Date(this.state.eventEnd.value)
        var endDate = this.state.eventEnd

        if(startDateTime > endDateTime) {

            endDate.message.value = 'End date must be after start date'
            endDate.message.status = 'invalid'
            endDate.className = 'invalid'

            this.setState({
                endDate
            })

            return false

        } else {
            endDate.message.value = ''
            endDate.message.status = ''
            endDate.className = ''
        }

        return true
    },
    handleSubmit(event){
        event.preventDefault()
        let self = this

        if(this.hasValidDates()) {

        let newEvent = {
            eventName: this.state.eventName.value,
            location: this.state.location.value,
            eventType: this.state.eventType.value,
            aboutEvent: this.state.aboutEvent.value,
            eventHost: this.state.eventHost.value,
            guest: this.state.guest.value,
            eventStart: new Date(this.state.eventStart.value).toISOString(),
            eventEnd: new Date(this.state.eventEnd.value).toISOString()
        }

        let settings = {
            method: 'POST',
            body: JSON.stringify(newEvent)
        }

        makeRequest('/api/v1/event', settings)
            .then(function(response){
                if(response.code === "CREATED") {
                    self.setState({
                        message : {
                            value: 'Successfully created event.',
                            status: 'valid'
                        }
                    })

                    self.history.pushState(null, '/u/event/' + response.data.id)

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
        }

    },
    render(){

        return (
            <Form formNoValidate={true} onSubmit={this.handleSubmit}>
                <h3 className="center">Register Event</h3>
                <Label for="eventName" text="Event Name*">
                    <Input {...this.state.eventName} id="eventName" onChange={this.handleChange} />
                </Label>
                <div className="half">
                    <Label for="eventHost" text="Event Host*">
                        <Input {...this.state.eventHost} id="eventHost" onChange={this.handleChange}/>
                    </Label>
                </div>
                <div className="half last">
                    <Label for="eventType" text="Event Type*">
                        <Input {...this.state.eventType} id="eventType" list="eventType-list" onChange={this.handleChange}/>
                        <Datalist id="eventType-list"  options={this.state.eventType.options} onChange={this.handleChange} />
                    </Label>
                </div>
                <div className="half">
                    <Label for="eventStart" text="Event Starts*">
                        <Input {...this.state.eventStart} id="eventStart" onChange={this.handleChange}/>
                    </Label>
                </div>
                <div className="half last">
                    <Label for="eventEnd" text="Event Ends*">
                        <Input {...this.state.eventEnd} id="eventEnd" onChange={this.handleChange}/>
                        <Message message={this.state.eventEnd.message.value} status={this.state.eventEnd.message.status}/>
                    </Label>
                </div>
                <div className="half">
                    <Label for="guest" text="Guest List*">
                        <Input {...this.state.guest} id="guest" onChange={this.handleChange}/>
                    </Label>
                </div>
                <div className="half last">&nbsp;</div>
                <div className="cf">
                    <Label for="location" text="Location*">
                        <Geosuggest
                        id="location"
                        placeholder="Start typing!"
                        initialValue="Seattle, WA"
                        fixtures={this.state.fixtures}
                        onSuggestSelect={this.onSuggestSelect}
                        location={new google.maps.LatLng(53.558572, 9.9278215)}
                        radius="20" />
                    </Label>
                </div>
                <Label for="aboutEvent" text="About Event (optional)" className="cf">
                    <Textarea {...this.state.aboutEvent} id="aboutEvent" className="mb" rows="6" cols="50" maxLength="400" onChange={this.handleChange}/>
                    <p className="fr mt0">Max chars 400</p>
                </Label>
                <Message message={this.state.message.value} status={this.state.message.status}/>
                <Input type="submit" value="Register Event" className="btn btn-primary centered"/>
            </Form>
        )
    }
})

export default AddEventsForm
