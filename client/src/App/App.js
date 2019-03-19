import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.js';
import Nav from './pages/Nav.js';
import Footer from './pages/Footer.js';
import PasswordGenerator from './pages/PasswordGenerator.js';
import JokesContainer from './pages/jokes/JokesContainer.js';

class App extends Component {
  render() {
    const App = () => (
      <div id="appContainer">
        <div id="appNavigation"><Nav /></div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/jokes' component={JokesContainer}/>
          <Route path='/passwords' component={PasswordGenerator}/>
        </Switch>
        <div id="appFooter"><Footer /></div>
      </div>
    )
    return (
      <Switch>
        <App style={{background: "url(/images/background1.jpg)"}}/>
      </Switch>
    );
  }
}

export default App;
