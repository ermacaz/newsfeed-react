import React from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Col'
import NewsStory from './NewsStory'
import ActionCable from "actioncable";
import {API_WS_ROOT} from "../constants";
import ShowHideSwitch from "./ShowHideSwitch";

class NewsSource extends React.Component {
 
  
  handleClick = e => {
    var win=window.open(this.state.source.source_url, '_blank');
    win.focus();
  }
  
  constructor(...props) {
    super(...props)
    this.showExtra = this.showExtra.bind(this)
    this.hideExtra = this.hideExtra.bind(this)
    this.state = {
      source: this.props.source,
      hideExtraLinks: this.props.hideExtraLinks
    }
  }
  
  componentWillReceiveProps = nextProps => {
    this.setState({source: nextProps.source})
  };
  
  showExtra = () => {
    this.setState({
      hideExtraLinks: '0'
    })
  }
  
  hideExtra = () => {
    this.setState({
      hideExtraLinks: '1'
    })
  }
  
  render = () => {
    let stories = this.state.source.stories;
    if (this.state.hideExtraLinks !== '0') {
      stories = stories.slice(0,9)
    }
    return (
      <Col md={4} style={colStyle}>
        <Row style={storyDivStyle}>
          <Col md={{span: 11, offset: 1}}>
            <h3><span className={'newsSourceTitle'} onClick={this.handleClick} >{this.state.source.source_name}</span></h3>
          </Col>
        </Row>
        <Row style={storyDivStyle}>
          <Col md={12}>
            <p>{newsStories(stories)}</p>
            <p>{<ShowHideSwitch showExtra={this.showExtra} hideExtra={this.hideExtra} sourceName={this.state.source.source_name}/>}</p>
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
      <NewsStory key={index} story={story} togglable={false}/>
    )
  })
}

const newsStoriesTogglable = stories => {
  return stories.map(function(story, index) {
    return (
      <NewsStory key={index} story={story} togglable={true}/>
    )
  })
}


const colStyle = {
  marginBottom: '3em'
}

const storyDivStyle = {
  lineHeight: '1em',
  height: '5em;',
  verticalAlign: 'center'
}