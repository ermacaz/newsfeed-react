import React from 'react';

class ShowMoreLink extends React.Component {
  render() {
    return (
      <a className="hover-info showMoreLess" onClick={ e=> this.props.handler(e)} href="#" rel="noreferrer">↓ Show More</a>
    )
  }
}

export default ShowMoreLink

