import * as React from 'react';
import { Table } from 'semantic-ui-react'
//import { Phase, Board } from '../logic/Logic';
import { Server, GameState } from '../logic/Server';

export interface Props {
    server: Server;
}

const GameStateMsg = {
    [GameState.Playing]: "Spiel läuft...",
    [GameState.Waiting]: "",
    [GameState.Finished]: "Spiel ist beendent",
    [GameState.FindMatch]: "Search for partner....",
    [GameState.Error]: "Server error"
}


class ServerInfo extends React.Component<Props, object> {
    render() {
        const { server } = this.props;
        return (
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            Mode
			</Table.Cell>
                        <Table.Cell>
                            {server.connected ? "Online" : "Offline"}
                        </Table.Cell>
                    </Table.Row>
                    {server.connected &&
                        (<>
                            <Table.Row>
                                <Table.Cell>
                                    Am Zug
			     </Table.Cell>
                                <Table.Cell>
                                    {server.gameState === GameState.Playing ? (server.myturn ? "Du" : "Gegner") : ""}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Status
			     </Table.Cell>
                                <Table.Cell>
                                    {GameStateMsg[server.gameState]}
                                </Table.Cell>
                            </Table.Row>
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
        )
    }
}

export default ServerInfo
