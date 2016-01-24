const Label = React.createClass({
  render() {
    return (
      <label htmlFor={this.props.for} className={this.props.className}>
        <span>{this.props.text}</span>
        {this.props.children}
      </label>
    )
  }

})

export default Label
