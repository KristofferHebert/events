const Time = React.createClass({
    getDefaultProps(){
        return {
            iso: ""
        }
    },
    render(){

        var startTime = new Date(this.props.iso);
        startTime = new Date(startTime.getTime() + ( startTime.getTimezoneOffset() * 60000 ) );
        startTime = startTime.toLocaleString()

        return (
            <div>
                {startTime}
            </div>

        )
    }
})

export default Time
