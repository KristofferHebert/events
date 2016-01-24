const Message = React.createClass({
  getDefaultProps() {
    return {
      message: ''
    }
  },
  render() {

    var className = 'message ' + this.props.status + ' ' + this.props.className
    return (
      <div>
        {this.props.message !== '' ? (
            <p className={className}>{this.props.message}</p>
          )
          : null}
      </div>
    )
  }
})

export default Message
