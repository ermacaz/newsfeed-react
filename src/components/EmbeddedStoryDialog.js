import React, {useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import sanitizeString from "../helpers/sanitizeString";


function EmbeddedStoryDialog({story, setShowStoryDialog}) {
  
  const handleClose = () => {
    window.history.replaceState(null, "Ryori", "/");
    setShowStoryDialog(0)
  }
  
  const renderStoryImage = () => {
    return (
      <img alt='primaryImage' style={{ margin: 'auto', display: 'block', minHeight: '250px',  maxWidth: '350px'}} src={story.media_url}/>
    )
  }
  
  const renderStory = (content) => {
    return (
      <div className={'storyContent'}>
        {content.map((part, i) => {
          return(
            <p>{part}</p>
          )
        })}
      </div>
    )
  } 
  
  const renderStoryBody = (content) => {
    return (
      <Modal.Body className={'modal-dark'}>
        {story.media_url &&
          <Row style={{marginTop: '1.5rem', marginBottom: '1.5rem'}}>
            <Col xs={{span: 12}}>
              {renderStoryImage()}
            </Col>
          </Row>
        }
        <Row>
          <Col md={{span:8, offset: 2}}>
            {renderStory(content)}
          </Col>
        </Row>
      </Modal.Body>
    )
  }
  
  const renderMediaBody = () => {
    if (story.content.match(/vid/)) {
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
              <img alt='primaryImage' style={{ margin: 'auto', display: 'block', minHeight: '250px', maxWidth: '350px'}} src={story.content}/>
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
    <Modal show={true} size="lg"  onHide={() => handleClose()}>
      <Modal.Header closeButton  className={'title-color modal-dark'}>
        <Modal.Title>
          {story.title}
          <div><a className={'storyDialogLink'} href={story.link} target="_blank" rel="noreferrer">View</a></div>
        </Modal.Title>
      </Modal.Header>
      {renderBody()}
    </Modal>
  )
}
export default EmbeddedStoryDialog;