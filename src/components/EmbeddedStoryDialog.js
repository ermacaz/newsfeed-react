import React, {useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import sanitizeString from "../helpers/sanitizeString";


function EmbeddedStoryDialog({story, setShowStoryDialog}) {
  
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    setShowStoryDialog(0);
  }
  
  useEffect(() => {
    window.onpopstate = onBackButtonEvent;
  }, [])
  
  const handleClose = () => {
    window.history.replaceState(null, "Ryori", "/");
    setShowStoryDialog(0)
  }
  
  const renderImage = (src) => {
    return (
      <img alt='content' style={{ margin: 'auto', display: 'block', minHeight: '250px',  maxWidth: '350px'}} src={src}/>
    )
  }
  
  const renderStory = (content) => {
    return (
      <div className={'storyContent'}>
        {content.map((part, i) => {
          if(part['img']) {
            return(
              renderImage(part['img'])
            )
          } else if (part['text']) {
            return(
              <p>{part['text']}</p>
            )
          }
          
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
              {renderImage(story.media_url)}
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