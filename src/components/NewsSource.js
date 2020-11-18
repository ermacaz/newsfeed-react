import React from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Col'
import NewsStory from './NewsStory'
import ActionCable from "actioncable";
import {API_WS_ROOT} from "../constants";


class NewsSource extends React.Component {
 
  
  handleClick = e => {
    var win=window.open(this.state.source.source_url, '_blank');
    win.focus();
  }
  
  constructor(...props) {
    super(...props)
    this.state = {
      source: this.props.source
    }
  }
  
  componentWillReceiveProps = nextProps => {
    this.setState({source: nextProps.source})
  };
  
  render = () => {
    return (
      <Col md={4} style={colStyle}>
        <Row style={storyDivStyle}>
          <Col md={{span: 11, offset: 1}}>
            <h3><span style={headerStyle} onClick={this.handleClick} >{this.state.source.source_name}</span></h3>
          </Col>
        </Row>
        <Row style={storyDivStyle}>
          <Col md={12}>
            <p>{newsStories(this.state.source.stories)}</p>
          </Col>
        </Row>
      </Col>
    )
  }
}
export default NewsSource;

const newsStories = stories => {
  return stories.map(function(story, index) {
    return (
      <NewsStory key={index} story={story}/>
    )
  })
}

const headerStyle = {
  textDecoration: 'underline',
  cursor: 'pointer',
}

const colStyle = {
  marginBottom: '3em'
}

const storyDivStyle = {
  lineHeight: '1em',
  height: '5em;',
  verticalAlign: 'center'
}