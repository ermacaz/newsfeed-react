import React from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Col'
import NewsStory from './NewsStory'
import ShowHideSwitch from "./ShowHideSwitch";

function NewsSource({source,  setShowStoryDialog}) {
  const [hideExtraLinks, setHideExtraLinks] = React.useState(1);
  
  const handleClick = e => {
    var win=window.open(source.source_url, '_blank');
    win.focus();
  }
  
  const showExtra = () => {
    setHideExtraLinks(0)
  }
  
  const hideExtra = () => {
    setHideExtraLinks(1)
  }
  
  const newsStories = stories => {
    return stories.map(function(story, index) {
      return (
        <NewsStory key={index} story={story} setShowStoryDialog={setShowStoryDialog}/>
      )
    })
  }
  
  let stories = [...source.stories];
  if (hideExtraLinks !== 0) {
    stories = stories.slice(0,9)
  }
  return (
    <Col md={4} style={colStyle}>
      <Row style={storyDivStyle}>
        <Col md={{span: 11, offset: 1}}>
          <h3><span className={'newsSourceTitle'} onClick={handleClick} >{source.source_name}</span></h3>
        </Col>
      </Row>
      <Row style={storyDivStyle}>
        <Col md={12}>
          <p>{newsStories(stories)}</p>
          <div>{<ShowHideSwitch showExtra={showExtra} hideExtra={hideExtra} sourceName={source.source_name}/>}</div>
        </Col>
      </Row>
    </Col>
  )
  
}

export default NewsSource;

const colStyle = {
  marginBottom: '3em'
}

const storyDivStyle = {
  lineHeight: '1em',
  height: '5em;',
  verticalAlign: 'center'
}