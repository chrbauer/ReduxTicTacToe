import * as React from 'react';
import { Message } from 'semantic-ui-react'
import { Phase, Board } from '../logic/TicTacToe';

export interface Props {
    board: Board;
}

const Messages = {
    [Phase.NotStarted]: "Das Spiel hat noch nicht begonnen.",
    [Phase.Playing]: "Das Spiel läuft aktuell noch...",
    [Phase.WinX]: "X hat gewonnen",
    [Phase.WinO]: "O hat gewonnen",
    [Phase.Draw]: "Unentschieden!"
}

class BoardPhase extends React.Component<Props, object> {
    render() {
        return (
            <Message>
                {Messages[this.props.board.phase]}
            </Message>
        );
    }

}

export default BoardPhase
