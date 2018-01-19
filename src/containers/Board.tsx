import Board from '../components/Board';
import { actions, asyncActions } from '../state/actions';
import { StoreState } from '../state/types';
import { connect, Dispatch } from 'react-redux';
import * as ttt from '../logic/TicTacToe';
import { Server } from '../logic/Server';

const mapStateToProps = ({ board, server }: StoreState) => ({ board, server });

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    onSet: (idx: number, server: Server, board: ttt.Board) => {
        if (!server.connected) {
            dispatch(actions.set(idx));
        } else if (server.player === board.colorToMove) {
            dispatch(asyncActions.send(server.game, idx));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
