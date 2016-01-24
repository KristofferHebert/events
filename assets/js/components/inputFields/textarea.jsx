const Textarea = React.createClass({
  getDefaultProps() {
    return {
      type: 'text',
      value: '',
      onChange: function() {}
    }
  },
  render() {
    return <textarea {...this.props}></textarea>
  }

})

export default Textarea
