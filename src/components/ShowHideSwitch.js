import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import ShowMoreLink from "./ShowMoreLink";
import ShowLessLink from "./ShowLessLink";

class ShowHideSwitch extends React.Component {
  constructor(...props) {
    super(...props)
    
    this.showMore = this.showMore.bind(this)
    this.showLess = this.showLess.bind(this)
    this.showExtra = this.props.showExtra.bind(this)
    this.hideExtra = this.props.hideExtra.bind(this)
    this.state = {
    
    }
   
  }
  
  showMore = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      showLessLink: '0'
    })
    this.showExtra()
    return false;
  }
  
  showLess = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      showLessLink: '1'
    })
    this.hideExtra()
    return false;
  }
  
  render = () => {
    const showLess = this.state.showLessLink
    if (showLess === '0') {
      return (
        <Row style={rowStyle}>
          <Col md={12} style={colStyle}>
          <ShowLessLink handler = {this.showLess}/>
        </Col>
      </Row>
      )
    } else {
      return (
        <Row style={rowStyle}>
          <Col md={12} style={colStyle}>
            <ShowMoreLink handler = {this.showMore}/>
          </Col>
        </Row>
      )
    }
  }
}

export default ShowHideSwitch

const colStyle = {
  paddingBottom: '0.5em',
  paddingTop: '0.5em',
  borderBottom: "1px solid #f1fa8c",
  display: 'flex',
  alignItems: 'center',
  width: '100%'
}

const rowStyle = {
  width: '100%'
}
