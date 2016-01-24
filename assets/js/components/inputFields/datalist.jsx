const Datalist = React.createClass({
        getDefaultProps(){
            return {
                name: '',
                options: [],
                value: ''
            }
        },
        render(){

            const options = this.props.options.map((option, i)=>{
                return (
                    <option key={i} value={option}>option</option>
                )
            })

            return (
                        <datalist id={this.props.id} value={this.props.value}>
                            {options}
                        </datalist>
        )
    }
})

export default Datalist
