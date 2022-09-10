import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class NewsStory extends React.Component {
  
  constructor(...props) {
    super(...props)
    this.state = {
      story: this.props.story,
      togglable: this.props.togglable
    }
  }
  
  
  sanitizeString = str => {
      let input = str.replace(/(<([^>]+)>)/ig, '').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('\\u0026quot;','"').replaceAll('\\u0026amp;','&')
      var doc = new DOMParser().parseFromString(input, "text/html");
    debugger
      return doc.documentElement.textContent;
  }
  
  renderTooltip = props => (
    <Tooltip id="button-tooltip"  {...props}>
      <span className={'tooltipText'}>{this.sanitizeString(this.state.story.description)}</span>
    </Tooltip>
  );
  
  rowStyle = togglable => {
    let display = 'flex';
    if (togglable) {
      display = 'none';
    }
    return {
      paddingBottom: '0.5em',
      paddingTop: '0.5em',
      borderBottom: "1px solid #6272a4",
      display: display,
      alignItems: 'center',
      minHeight: '5em',
      color: 'white'
    }
  }
  
  render = () => {
    const story = this.props.story
    const togglable = this.state.togglable
    if (story.media_url && story.media_url.length > 0) {
      if (this.state.story.description && this.state.story.description.length > 0) {
        return (
          <Row style={this.rowStyle(togglable)}>
            <Col xs={9}>
              <OverlayTrigger
                placement="top"
                delay={{show: 50, hide: 300}}
                overlay={this.renderTooltip}
              >
                <a className="hover-info newsStoryHeadline" href={story.link} target="_blank" rel="noreferrer">{this.sanitizeString(story.title)}</a>
              </OverlayTrigger>
            </Col>
            <Col xs={2} style={imgColStyle}><img style={imageStyle} src={this.sanitizeString(story.media_url)}></img></Col>
          </Row>
        )
       
      } else {
        return (
          <Row style={this.rowStyle(togglable)}>
            <Col xs={9}>
              <a className="hover-info newsStoryHeadline" href={story.link} target="_blank" rel="noreferrer">{this.sanitizeString(story.title)}</a>
            </Col>
            <Col xs={2} style={imgColStyle}><img style={imageStyle} src={this.sanitizeString(story.media_url)}></img></Col>
          </Row>
        )
      }
    } else {
      if (this.state.story.description && this.state.story.description.length > 0) {
        return (
          <Row style={this.rowStyle(togglable)}>
            <Col md={12}>
              <OverlayTrigger
                placement="top"
                delay={{show: 50, hide: 300}}
                overlay={this.renderTooltip}
              >
                <a className="hover-info newsStoryHeadline" href={story.link} target="_blank" rel="noreferrer">{this.sanitizeString(story.title)}</a>
              </OverlayTrigger>
            </Col>
          </Row>
        )
      } else {
        return (
          <Row style={this.rowStyle(togglable)}>
            <Col md={12}>
             
                <a className="hover-info newsStoryHeadline" href={story.link} target="_blank" rel="noreferrer">{this.sanitizeString(story.title)}</a>
            </Col>
          </Row>
        )
      }
    }
  }
}

export default NewsStory


const linkStyle = {

}

const imgColStyle = {
  float: 'right',
  verticalAlign: 'center'
}

const imageStyle = {
  maxHeight: '4em',
  maxWidth: '6em',
  verticalAlign: 'center'
  
}

