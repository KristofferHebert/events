import Time from '../../utils/time.jsx'

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
            <ul className="list-nostyle eventList">
                {events}
            </ul>
        )
    }
})

export default EventList
