import React from 'react';

class ShowLessLink extends React.Component {
  render() {
    return (
      <a className="hover-info show_less_link" onClick={ e=> this.props.handler(e)} style={linkStyle} href="#" rel="noreferrer">↑ Show Less</a>
    )
  }
}

export default ShowLessLink

const linkStyle = {
  display: 'inline-block',
  color: 'white'
}
