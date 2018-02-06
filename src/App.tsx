import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { StoreState } from './state/types';
import { OnlineState } from './logic/Server';

import ActionButtons from './containers/ActionButtons';
import Board from './containers/Board';
import BoardPhase from './containers/BoardPhase';
import ServerInfo from './containers/ServerInfo';
import Loading from './components/Loading';

import './App.css';
import { BOARD_SIZE, BOARD_PADDING } from './constants/Layout';

const logo = require('./logo_ittalk.png');

export interface Props {
    searching: boolean;
}

class App extends React.Component<Props, object> {
    render() {
        const { searching } = this.props;

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>IT Talk Redux TTT</h2>
                </div>
                <div className="App-content">
                    <Grid relaxed={false} columns={3}>
                        <Grid.Row only="computer">
                            <Grid.Column>
                                <ActionButtons />
                            </Grid.Column>
                            <Grid.Column style={{ minWidth: BOARD_SIZE + 2 * BOARD_PADDING }} >
                                <div>
                                    <Loading loading={searching}>
                                        <Board />
                                    </Loading>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <ServerInfo />
                                <BoardPhase />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row only="tablet mobile" columns={1}>
                            <Grid.Column>
                                <ActionButtons />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row only="tablet mobile" columns={1}>
                            <Grid.Column>
                                <Loading loading={searching}>
                                    <Board />
                                </Loading>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row only="tablet mobile" columns={1}>
                            <Grid.Column>
                                <ServerInfo />
                                <BoardPhase />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        );
    }
}



export default connect(({ server: { onlineState } }: StoreState) => ({ searching: onlineState === OnlineState.FindMatch }))(App as any)
