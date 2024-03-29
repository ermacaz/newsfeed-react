import React, {useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {LazyLoadImage} from "react-lazy-load-image-component";
import md5 from "md5";


function EmbeddedStoryDialog({story, setShowStoryDialog}) {
  const [showQuotes,setShowQuotes] = React.useState(false);
  const [quoteColor,setQuoteColor]   = React.useState("#6272A4");
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    setShowStoryDialog(0);
  }
  
  useEffect(() => {
    window.onpopstate = onBackButtonEvent;
  })
  
  const handleClose = () => {
    window.history.replaceState(null, "Newsfeed", "/");
    setShowStoryDialog(0)
  }
  
  const renderStoryImage = () => {
    return (
      <LazyLoadImage src={story.media_url}
                     style={imageStyle}
                     alt="story"
      />
    )
  }
  
  const renderStoryWithQuotes = (content) => {
    let parts = []
    content.forEach((part, i) => {
      const str = `${part}`
      parts.push(str)
    })
    return (
      <div className={'storyContent'}>
        {parts.map((part, i) => {
          return(
            <>
              >{part}
              <br/>>
              <br/>
            </>
          )
        })}
      </div>
    )
  }
  
  const renderStory = (content) => {
    return (
      <div className={'storyContent'}>
        {content.map((part, i) => {
          return(
            <p key={md5(story.link) + '-' + i}>{part}</p>
          )
        })}
      </div>
    )
  }
  
  const toggleQuote = () => {
    const qc = showQuotes ? "#6272A4" : "#F1FA8C" 
    setShowQuotes(!showQuotes)
    setQuoteColor(qc)
  }
  
  const renderStoryBody = (content) => {
    return (
      <Modal.Body className={'modal-dark'}>
        <div style={{float: "right", color: quoteColor}}><span style={{cursor: "pointer"}} onClick={(e) => { e.preventDefault(); toggleQuote(true);}}>Quote</span></div>
        {story.media_url &&
          <Row style={{marginTop: '1.5rem', marginBottom: '1.5rem'}}>
            <Col xs={{span: 12}}>
              {renderStoryImage()}
            </Col>
          </Row>
        }
        <Row>
          <Col md={{span: 8, offset: 2}}>
            {!showQuotes && renderStory(content)}
            {showQuotes && renderStoryWithQuotes(content)}
          </Col>
        </Row>
      </Modal.Body>
    )
  }
  
  const renderMediaBody = () => {
    if (story.content.match(/vid|mp4$/)) {
      return (
        <Modal.Body className={'modal-dark'}>
          <Row>
            <Col xs={12} style={{textAlign: 'center'}}>
              <video style={{maxWidth: '350px'}} controls={'controls'} autoPlay={'autoplay'}
                     loop={"loop"} muted>
                <source src={story.content} type={'video/mp4'}></source>
              </video>
            </Col>
          </Row>
        </Modal.Body>
      )
    } else if (story.content.match(/pics/)) {
      return (
        <Modal.Body className={'modal-dark'}>
          <Row>
            <Col xs={12} style={{textAlign: 'center'}}>
              <LazyLoadImage src={story.media_url}
                             style={imageStyle}
                             alt="story"
              />
            </Col>
          </Row>
        </Modal.Body>
      )
    } else {
      renderStory([story.content])
    }
  }
  
  const renderBody = () => {
    if (typeof story.content == 'string') {
      return renderMediaBody();
    } else {
      return renderStoryBody(story.content);
    }
  }
  
  return (
    <Modal show={true} size="lg" onHide={() => handleClose()}>
      <Modal.Header closeButton className={'title-color modal-dark'}>
        <Modal.Title>
          <div style={{marginLeft: '2.5rem'}}>
            {story.title}
          </div>
          <div>
            <div style={{display: "inline", verticalAlign: 'middle'}}><a className={'storyDialogLink'} href={story.link}
                                                                         target="_blank" rel="noreferrer">View</a></div>
            <div style={{display: "inline", color: '#6272A4'}}><small
              style={{fontSize: '0.4em'}}>&nbsp;&nbsp;{story.source}</small></div>
          </div>
        </Modal.Title>
      </Modal.Header>
      {renderBody()}
    </Modal>
  )
}
export default EmbeddedStoryDialog;

const imageStyle = { 
  margin: 'auto',
  display: 'block',
  minHeight: '250px',
  maxWidth: '350px'
}