import * as React from 'react';

import { Server, OnlineState } from '../logic/Server';
import { Button, List } from 'semantic-ui-react'

export interface Props {
    server: Server;
    onFindMatch: () => void;
    onNewGame: () => void;
    onResign: () => void;
}


class ActionButtons extends React.Component<Props, object> {

    render() {
        const p = this.props;
        return (
            <List>
                <List.Item>
                    <Button
                        icon="game"
                        disabled={p.server.connected && p.server.onlineState !== OnlineState.NotPlaying}
                        primary={p.server.connected && p.server.onlineState === OnlineState.NotPlaying}
                        label="New Game"
                        onClick={p.onNewGame} />
                </List.Item>
                <List.Item>
                    <Button
                        loading={p.server.onlineState === OnlineState.FindMatch}
                        disabled={p.server.onlineState !== OnlineState.NotPlaying}
                        icon="plug"
                        label="Find Match"
                        onClick={p.onFindMatch} />
                </List.Item>
                <List.Item>
                    <Button
                        disabled={p.server.onlineState !== OnlineState.Playing}
                        negative={true}
                        icon="frown"
                        label="Aufgeben"
                        onClick={p.onResign} />
                </List.Item>
            </List>
        );
    }
}

export default ActionButtons
