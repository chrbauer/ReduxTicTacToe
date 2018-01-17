import * as React from 'react';
import { Table } from 'semantic-ui-react'
//import { Phase, Board } from '../logic/Logic';
import { FieldValue } from '../logic/Logic';
import { Server, OnlineState } from '../logic/Server';

export interface Props {
    server: Server;
}

const OnlineStateMsg = {
    [OnlineState.Playing]: "Spiel läuft...",
    [OnlineState.NotPlaying]: "",
    [OnlineState.FindMatch]: "Search for partner....",
    [OnlineState.Error]: "Server error"
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
                                    Deine Farbe
			     </Table.Cell>
                                <Table.Cell>
                                    {FieldValue[server.player]}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Am Zug
			     </Table.Cell>
                                <Table.Cell>
                                    {server.onlineState === OnlineState.Playing ? (server.player === server.colorToMove ? "Du" : "Gegner") : ""}
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
