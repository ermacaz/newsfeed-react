import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { LazyLoadImage } from "react-lazy-load-image-component";
import sanitizeString from "../helpers/sanitizeString";
import md5 from 'md5';

function NewsStory({story, setShowStoryDialog}) {
  
  
  const renderTooltip = () => (
    <Tooltip id="button-tooltip" >
      <span className={'tooltipText'}>{sanitizeString(story.description)}</span>
    </Tooltip>
  );
  
  const handleShowStory = (story) => {
    const linkHash = md5(story.link)
    window.history.replaceState(null, linkHash, "#/" + story.source + '/' + linkHash);
    setShowStoryDialog(story);
  }
  
  const storyLink = () => {
    let title = story.title
    const linkHash = md5(story.link)
    if (story.title.length > 125) {
      title = story.title.substring(0,122) + '...'
    }
    if (story.content) {
      return (
        <a className="hover-info newsStoryHeadline embedStoryLink" onClick={(e) => { e.preventDefault(); handleShowStory(story);}} href={'#/'+linkHash}>{sanitizeString(title)}</a>
      )
    } else {
      return (
        <a className="hover-info newsStoryHeadline" href={story.link} target="_blank" rel="noreferrer">{sanitizeString(title)}</a>
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
  
  if (story.media_url_thumb && story.media_url_thumb.length > 0) {
    return (
      <Row style={rowStyle}>
        <Col xs={9} style={textColStyle}>
          {storyLinkWithOverlay()}
        </Col>
        <Col xs={2} style={imgColStyle}>
          <LazyLoadImage src={story.media_url_thumb}
                         style={imageStyle}
                         alt="story"
          />
        </Col>
      </Row>
    )
  } else {
      return (
        <Row style={rowStyle}>
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
  // maxWidth: '6em',
  verticalAlign: 'center'
  
}

const textColStyle = {
  height: '100%',
  overflow: 'hidden'
}

const rowStyle = {
  paddingBottom: '0.5em',
  paddingTop: '0.5em',
  borderBottom: "1px solid #6272a4",
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  height: '5.7em',
  color: 'white'
}

