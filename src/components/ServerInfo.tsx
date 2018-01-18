import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { Player } from '../logic/TicTacToe';
import { Server, OnlineState } from '../logic/Server';

export interface Props {
    server: Server;
}

const OnlineStateMsg = {
    [OnlineState.Playing]: 'Game in progress...',
    [OnlineState.NotPlaying]: '',
    [OnlineState.FindMatch]: 'Search for partner....',
    [OnlineState.Error]: 'Server error'
};

class ServerInfo extends React.Component<Props, object> {
    render() {
        const { server } = this.props;
        let playerToMove = '';
        if (server.onlineState === OnlineState.Playing) {
            playerToMove = server.player === server.colorToMove ? 'Du' : 'Gegner';
        }
        return (
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            Mode
                        </Table.Cell>
                        <Table.Cell>
                            {server.connected ? 'Online' : 'Offline'}
                        </Table.Cell>
                    </Table.Row>
                    {server.connected &&
                        (<>
                            <Table.Row>
                                <Table.Cell>
                                    Deine Farbe
                             </Table.Cell>
                                <Table.Cell>
                                    {Player[server.player]}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Am Zug
                             </Table.Cell>
                                <Table.Cell>
                                    {playerToMove}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Status
                             </Table.Cell>
                                <Table.Cell>
                                    {OnlineStateMsg[server.onlineState]}
                                </Table.Cell>
                            </Table.Row>
                            {server.resigned !== Player.Nobody &&
                                (<Table.Row>
                                    <Table.Cell>
                                        Resigned
                              </Table.Cell>
                                    <Table.Cell>
                                        {Player[server.resigned]}
                                    </Table.Cell>
                                </Table.Row>)
                            }
                            {server.errorMsg &&
                                (<Table.Row>
                                    <Table.Cell>
                                        Problem
                              </Table.Cell>
                                    <Table.Cell>
                                        {server.errorMsg}
                                    </Table.Cell>
                                </Table.Row>)
                            }
                            </>)
                    }
                </Table.Body>
            </Table>
        );
    }
}

export default ServerInfo;
