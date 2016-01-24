const Section = React.createClass({
    render(){
        return (
            <section>
                { this.props.show ? this.props.children : null }
            </section>
        )
    }
})

export default Section
