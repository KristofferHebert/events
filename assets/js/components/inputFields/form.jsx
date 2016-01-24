const Form = React.createClass({
  getDefaultProps() {
    return {method: 'put'}
  },
  render() {
    return (
      <form method={this.props.method} onSubmit={this.props.onSubmit} formNoValidate={this.props.formNoValidate}>
        {this.props.children}
      </form>
    )
  }

})

export default Form
