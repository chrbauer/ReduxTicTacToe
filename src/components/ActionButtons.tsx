import * as React from 'react';

import { Server, ServerState } from '../logic/Server';
import { Button, List } from 'semantic-ui-react'

export interface Props {
    server: Server;
    onFindMatch: () => void;
    onNewGame: () => void;
}


class ActionButtons extends React.Component<Props, object> {

    render() {
        const p = this.props;
        return (
            <List>
                <List.Item>
                    <Button
                        icon="game"
                        label="New Game"
                        onClick={p.onNewGame} />
                </List.Item>
                <List.Item>
                    <Button
                        loading={p.server.state === ServerState.Searching}
                        icon="plug"
                        label="Find Match"
                        onClick={p.onFindMatch} />
                </List.Item>
            </List>
        );
    }
}

export default ActionButtons
