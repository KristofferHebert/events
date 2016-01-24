const Input = React.createClass({
  getDefaultProps() {
    return {
      type: 'text',
      value: '',
      onChange: function() {}
    }
  },
  render() {
    var className = 'input ' + this.props.status + ' ' + this.props.className

    return <input {...this.props} className={className}/>
  }

})

export default Input
