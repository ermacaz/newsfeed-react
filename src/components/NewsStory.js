import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class NewsStory extends React.Component {
  
  constructor(...props) {
    super(...props)
    this.state = {
      story: this.props.story
    }
  }
  
  renderTooltip = props => (
    <Tooltip id="button-tooltip" {...props}>
      {this.state.story.description}
    </Tooltip>
  );
  
  
  
  render = () => {
    const story = this.props.story
    if (story.media_url && story.media_url.length > 0) {
      if (this.state.story.description && this.state.story.description.length > 0) {
        return (
          <Row style={rowStyle}>
            <Col xs={9}>
              <OverlayTrigger
                placement="top"
                delay={{show: 50, hide: 300}}
                overlay={this.renderTooltip}
              >
                <a className="hover-info" style={linkStyle} href={story.link} target="_blank" rel="noreferrer">{story.title}</a>
              </OverlayTrigger>
            </Col>
            <Col xs={{span: 2, offset: 1}} style={imgColStyle}><img style={imageStyle} src={story.media_url}></img></Col>
          </Row>
        )
       
      } else {
        return (
          <Row style={rowStyle}>
            <Col xs={9}>
              <a className="hover-info" style={linkStyle} href={story.link} target="_blank" rel="noreferrer">{story.title}</a>
            </Col>
            <Col xs={{span: 2, offset: 1}} style={imgColStyle}><img style={imageStyle} src={story.media_url}></img></Col>
          </Row>
        )
      }
    } else {
      if (this.state.story.description && this.state.story.description.length > 0) {
        return (
          <Row style={rowStyle}>
            <Col md={12}>
              <OverlayTrigger
                placement="top"
                delay={{show: 50, hide: 300}}
                overlay={this.renderTooltip}
              >
                <a className="hover-info" style={linkStyle} href={story.link} target="_blank" rel="noreferrer">{story.title}</a>
              </OverlayTrigger>
            </Col>
          </Row>
        )
      } else {
        return (
          <Row style={rowStyle}>
            <Col md={12}>
             
                <a className="hover-info" style={linkStyle} href={story.link} target="_blank" rel="noreferrer">{story.title}</a>
            </Col>
          </Row>
        )
      }
    }
  }
}

export default NewsStory


const linkStyle = {
  display: 'inline-block',
  color: 'white'
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

const rowStyle = {
  paddingBottom: '0.5em',
  paddingTop: '0.5em',
  borderBottom: "1px solid lightgray",
  display: 'flex',
  alignItems: 'center',
  minHeight: '5em'
}