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
      <img alt='primaryImage' style={{ margin: 'auto', display: 'block', minHeight: '250px', maxHeight: '400px', maxWidth: '350px;'}} src={story.media_url}/>
    )
  }
  
  const renderStory = () => {
    return (
      <div className={'storyContent'}>
        {story.content.map((part, i) => {
          return(
            <p>{part}</p>
          )  
        })}
      </div>
    )
  } 
  
  return (
    <Modal show={true} size="lg"  onHide={() => handleClose()}>
      <Modal.Header closeButton  className={'title-color modal-dark'}>
        <Modal.Title>
          {story.title}
          <div><a className={'storyDialogLink'} href={story.link} target="_blank" rel="noreferrer">View</a></div>
        </Modal.Title>
      </Modal.Header>
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
            {renderStory()}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
export default EmbeddedStoryDialog;