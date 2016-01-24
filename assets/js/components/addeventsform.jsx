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
              placeholder : 'Beth\'s 30th Birthday'
            },
            location: {
              name: 'location',
              type: 'text',
              value: '',
              placeholder : 'San Francisco, CA'
            },
            eventType: {
              name: 'eventType',
              type: 'text',
              value: '',
              placeholder : 'Birthday Party',
              list: 'eventType-list',
              options: ['Birthday Party', 'Conference Talk', 'Wedding', 'Other']
            },
            eventHost: {
              name: 'eventHost',
              type: 'text',
              value: '',
              placeholder : 'Your Name'
            },
            eventStart: {
              name: 'eventStart',
              type: 'datetime-local',
              value: ''
            },
            eventEnd: {
              name: 'eventStart',
              type: 'datetime-local',
              value: ''
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
        var updateState = this.state.email

        if(this.state.email.value == '' || this.state.email.status == 'invalid'){
          updateState.message = 'Please provide valid email'
          this.setState(updateState)
        } else {
            let self = this
            let newUser = {
                email: this.state.email.value,
                fullname: this.state.fullname.value,
                bio:  this.state.bio.value,
                password: this.state.password.value
            }

            let settings = {
                method: 'POST',
                body: JSON.stringify(newUser),
            }

            makeRequest('/api/v1/user', settings)
                .then(function(response){
                    console.log(response)
                    if(response.code === "CREATED") {
                        self.setState({
                            message : {
                                value: 'Successfully created account.',
                                status: 'valid'
                            }
                        })

                        let User = {
                            email: newUser.email,
                            password: newUser.password
                        }

                        Auth.loginUser(User, function(err, response){
                            self.history.pushState(null, '/u')
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
                            value: 'Email is already registered.',
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

                   <div className="half"><Label for="eventStart" text="Event Starts*">
                     <Input {...this.state.eventStart} id="eventStart" onChange={this.handleChange}/>
                   </Label></div>
                   <div className="half last">
                   <Label for="eventEnd" text="Event Ends*">
                     <Input {...this.state.eventEnd} onChange={this.handleChange}/>
                   </Label></div>
                   <Label for="location" text="Location*">
                    <Geosuggest
                        placeholder="Start typing!"
                        initialValue="Seattle, WA"
                        fixtures={this.state.fixtures}
                        onSuggestSelect={this.onSuggestSelect}
                        location={new google.maps.LatLng(53.558572, 9.9278215)}
                        radius="20" />
                   </Label>
                   <Label for="message" text="Message (optional)" className="cf">
                    <Textarea {...this.state.message} className="mb" rows="6" cols="50" maxLength="400" onChange={this.handleChange}/>
                    <p className="fr mt0">Max chars 400</p>
                  </Label>
                <Input type="submit" value="Register Event" className="btn btn-primary centered"/>
            </Form>
        )
    }
})

export default AddEventsForm
