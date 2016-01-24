const Section = React.createClass({
    getDefaultProps(){
        return {
            show: false
        }
    },
    render(){
        return (
            <section>
                { this.props.show ? this.props.children : null }
            </section>
        )
    }
})

export default Section
