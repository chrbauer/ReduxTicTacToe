import * as React from 'react';
import Board from './components/Board';
import './App.css';

const logo = require('./logo_ittalk.png');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>IT Talk Redux TTT</h2>
        </div>
       <Board />
      </div>
    );
  }
}

export default App;
