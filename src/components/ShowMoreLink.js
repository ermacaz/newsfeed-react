import React from 'react';

class ShowMoreLink extends React.Component {
  render() {
    return (
      <a className="hover-info" onClick={ e=> this.props.handler(e)} style={linkStyle} href="#" rel="noreferrer">↓ Show More</a>
    )
  }
}

export default ShowMoreLink

const linkStyle = {
  display: 'inline-block',
  color: 'white'
}