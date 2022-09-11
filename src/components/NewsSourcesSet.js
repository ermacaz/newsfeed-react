import React, { useEffect } from "react";

// import { ActionCableConsumer } from 'react-actioncable-provider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NewsSource from './NewsSource';
import ActionCable from "actioncable";
import EmbeddedStoryDialog from "./EmbeddedStoryDialog";
import {API_ROOT, API_WS_ROOT} from "../constants";


function NewsSourcesSet() {
  const [newsSources, setNewsSources] = React.useState([]);
  const [showStoryDialog, setShowStoryDialog] = React.useState(0);
  
  const newsSourceElements = newsSourceTrio => {
    return newsSourceTrio.map(function(source) {
      return <NewsSource key={source.source_name} source={source} setShowStoryDialog={setShowStoryDialog}/>
    })
  }
  
  const showSources = (newsSources) => {
    return newsSources.map(function (newsSourceTrio, index) {
      return (
        <Row key={index} >
          {newsSourceElements(newsSourceTrio)}
        </Row>
      )
    })
  }
  
  const handleReceived = (message) => {
    console.log('called')
    setNewsSources((message))
  }
  
  const cable = ActionCable.createConsumer(`${API_WS_ROOT}`)
  cable.subscriptions.create('NewsSourcesChannel', {received: (response) => {handleReceived(response)}})
  
  const getNewsSourceData = () => {
    fetch(`${API_ROOT}/news_sources`)
      .then(res => res.json())
      .then(newsSources => setNewsSources(newsSources))
  }
  
  useEffect(() => {
    getNewsSourceData()
  }, [])
  
  const chunk_size = 3;
  const localSourceSet = [...newsSources];
  if (localSourceSet.length > 0) {
    const newsSourcesSet = localSourceSet.map(function(e,i) {
      return i%chunk_size===0 ? localSourceSet.slice(i,i+chunk_size) : null;
    }).filter(x=>!!x);
    if (newsSourcesSet.length > 0) {
      return (
        <div>
          {showSources(newsSourcesSet)}
          {showStoryDialog !== 0 &&
            <EmbeddedStoryDialog story={showStoryDialog} setShowStoryDialog={setShowStoryDialog}/>
          }
        </div>
      )
    } else {
      return (
        <Container fluid>
          <p>Loading</p>
        </Container>
      )
    }
  } else {
    return (
      <Container fluid>
        <p>Loading</p>
      </Container>
    )
  }
}

export default NewsSourcesSet;