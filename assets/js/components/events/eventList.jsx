import Time from '../../utils/time.jsx'
import {Link} from 'react-router'

const EventList = React.createClass({
    getDefaultProps(){
        return {
            events: []
        }
    },
    render(){
        let events = this.props.events.map(function(event, i){

            return (
                <li key={i}>
                    <a href={'#/u/event/' + event.id}>
                        <h3>{event.eventName} <span className="fr"><Time iso={event.eventStart} /></span></h3>
                        <p className="small">Host: {event.eventHost} <br /><span>Type: {event.eventType}</span></p>
                        <p></p>
                    </a>
                </li>
            )
        })

        return (
            <section>
                <Link className={ (events.length === 0) ? 'btn btn-primary centered' : 'hidden'} to="/u/addevents">Add New Event</Link>
                <ul className="list-nostyle eventList">
                    {events}
                </ul>
            </section>
        )
    }
})

export default EventList
