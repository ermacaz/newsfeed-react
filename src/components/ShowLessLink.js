import React from 'react';

class ShowLessLink extends React.Component {
  render() {
    return (
      <a className="hover-info show_less_link showMoreLess" onClick={ e=> this.props.handler(e)} href="#" rel="noreferrer">↑ Show Less</a>
    )
  }
}

export default ShowLessLink
