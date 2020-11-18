import React from 'react';
// import { ActionCableConsumer } from 'react-actioncable-provider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NewsSource from './NewsSource';
import ActionCable from "actioncable";
import {API_ROOT, API_WS_ROOT} from "../constants";
class NewsSourcesSet extends React.Component {
  state = {
    newsSources: []
  }
  
  componentDidMount = () => {
    fetch(`${API_ROOT}/news_sources`)
      .then(res => res.json())
      .then(newsSources =>  this.setState({newsSources: newsSources}))
  }
  
  constructor(...props) {
    super(...props)
    this.handleReceived = this.handleReceived.bind(this);
    this.cable = ActionCable.createConsumer(`${API_WS_ROOT}`)
    this.cable.subscriptions.create('NewsSourcesChannel', {received: (response) => {this.handleReceived(response)}})
  }
  
  handleReceived(message) {
    console.log('called')
    this.setState({newsSources: message})
  }
  
  render = () => {
    console.log('rendering')
    const chunk_size = 3;
    const localSourceSet = this.state.newsSources;
    if (localSourceSet.length > 0) {
      const  newsSources  = localSourceSet.map(function(e,i) {
        return i%chunk_size===0 ? localSourceSet.slice(i,i+chunk_size) : null;
      }).filter(x=>!!x);
      if (newsSources.length > 0) {
        return (
          <div>
            {showSources(newsSources)}
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
}

export default NewsSourcesSet;

const newsSourceElements = newsSourceTrio => {
  return newsSourceTrio.map(function(source) {
    return <NewsSource key={source.source_name} source={source}/>
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