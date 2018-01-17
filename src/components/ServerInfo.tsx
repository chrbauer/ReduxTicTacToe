import * as React from 'react';
import { Table } from 'semantic-ui-react'
//import { Phase, Board } from '../logic/Logic';
import { Server } from '../logic/Server';

export interface Props {
    server: Server;
}

class ServerInfo extends React.Component<Props, object> {
    render() {
        const { server } = this.props;
        return (
            <Table>
                <Table.Row>
                    <Table.Cell>
                        Mode
		    </Table.Cell>
                    <Table.Cell>
                        {server.connected ? "Online" : "Offline"}
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Am Zug
		    </Table.Cell>
                    <Table.Cell>
                        Du
		    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Status
		    </Table.Cell>
                    <Table.Cell>
                        Spiel läuft
		    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        Problem
		    </Table.Cell>
                    <Table.Cell>
                        Kein Problem
		    </Table.Cell>
                </Table.Row>
            </Table>
        )
    }
}

export default ServerInfo
