import React, { Component } from 'react';
import './App.css';
import PasswordGenerator from './pages/PasswordGenerator.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h4>Hello from App.js</h4>
        <PasswordGenerator />
      </div>
    );
  }
}

export default App;
