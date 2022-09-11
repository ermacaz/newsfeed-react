import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import sanitizeString from "../helpers/sanitizeString";

function NewsStory({story, setShowStoryDialog}) {
  
  
  const renderTooltip = () => (
    <Tooltip id="button-tooltip" >
      <span className={'tooltipText'}>{sanitizeString(story.description)}</span>
    </Tooltip>
  );
  
  const rowStyle = () => {
    let display = 'flex';
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
  
  const storyLink = () => {
    if (story.content) {
      return (
        <a className="hover-info newsStoryHeadline embedStoryLink" onClick={(e) => { e.preventDefault(); setShowStoryDialog(story)}} href={'#/'+story.link}>{sanitizeString(story.title)}</a>
      )
    } else {
      return (
        <a className="hover-info newsStoryHeadline" href={story.link} target="_blank" rel="noreferrer">{sanitizeString(story.title.substring(0,149))}</a>
      )
    }
  }
  
  const storyLinkWithOverlay = () => {
    if (story.description && sanitizeString(story.description).length > 0) {
      return(
        <OverlayTrigger
          placement="top"
          delay={{show: 50, hide: 300}}
          overlay={renderTooltip()}
        >
          {storyLink()}
        </OverlayTrigger>
      )
    } else {
      return storyLink()
    }
  }
  
  if (story.media_url && story.media_url.length > 0) {
    return (
      <Row style={rowStyle()}>
        <Col xs={9}>
          {storyLinkWithOverlay()}
        </Col>
        <Col xs={2} style={imgColStyle}><img style={imageStyle} alt={"story"} src={sanitizeString(story.media_url)}></img></Col>
      </Row>
    )
  } else {
      return (
        <Row style={rowStyle()}>
          <Col md={12}>
            {storyLink()} 
          </Col>
        </Row>
      )
  }
}


export default NewsStory


const imgColStyle = {
  float: 'right',
  verticalAlign: 'center'
}

const imageStyle = {
  maxHeight: '4em',
  maxWidth: '6em',
  verticalAlign: 'center'
  
}

