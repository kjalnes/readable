import React, { Component } from 'react';
import logo from '../assets/images/logo.png';
import bookLogo from '../assets/images/book.png';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='header-container'>
            <div className='top-header'>
              <img src={logo} className="App-logo-1" alt="Readable" />
            </div>
          </div>
          <img src={bookLogo} className="App-logo" alt="Readable" />
          <br />
          <h1 className="App-title">Readable</h1>
        </header>
        <p className="App-intro">
        Udacity Project
        </p>
      </div>
    );
  }
}

export default App;
