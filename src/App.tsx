import * as React from 'react';

import Board from './containers/Board';
import BoardPhase from './containers/BoardPhase';

import './App.css';

import { Button, Grid } from 'semantic-ui-react'

const logo = require('./logo_ittalk.png');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>IT Talk Redux TTT</h2>
        </div>
	<div className="App-content">
	  <Grid columns={3} relaxed>
	    <Grid.Row>
	    <Grid.Column>
              <Button>Button</Button>
	    </Grid.Column>
	    
            <Grid.Column>
              <Board />
	    </Grid.Column>
	    
	    <Grid.Column>
              XXX
	    </Grid.Column>
	    </Grid.Row>
	    <Grid.Row>
	      <Grid.Column>
		
	    </Grid.Column>
	    
            <Grid.Column>
              <BoardPhase />
	    </Grid.Column>
	    
	    <Grid.Column>
	    </Grid.Column>
	    </Grid.Row>
	  </Grid>
	</div>
     </div>
    ); 
  }
}
 
export default App;
