import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import  Router  from './Router';

class App extends Component {
  render() {
    return (
      <div className="App">
      {Router}
      </div>
    );
  }
}

export default App;
