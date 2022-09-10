import logo from './logo.svg';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import NewsSourcesSet from "./components/NewsSourcesSet";
import React from "react";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Container fluid style={paddedStyle}>
       <NewsSourcesSet/>
       </Container>
      </header>
    </div>
  );
}

export default App;

const paddedStyle = {
  paddingTop: '1em',
  backgroundColor: '#282a36'
}