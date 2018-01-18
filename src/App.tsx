import * as React from 'react';
import { Grid } from 'semantic-ui-react';

import ActionButtons from './containers/ActionButtons';
import Board from './containers/Board';
import BoardPhase from './containers/BoardPhase';
import ServerInfo from './containers/ServerInfo';

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
                <div className="App-content">
                    <Grid columns={3} relaxed={true}>
                        <Grid.Row>
                            <Grid.Column>
                                <ActionButtons />
                            </Grid.Column>

                            <Grid.Column>
                                <Board />
                            </Grid.Column>

                            <Grid.Column>
                                <ServerInfo />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column />
                            <Grid.Column>
                                <BoardPhase />
                            </Grid.Column>
                            <Grid.Column />
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default App;
