import Board from '../components/Board';
import { actions, asyncActions } from '../state/actions';
import { StoreState } from '../state/types';
import { connect, Dispatch } from 'react-redux';
import * as logic from '../logic/Logic';
import { Server } from '../logic/Server';

const mapStateToProps = ({ board, server }: StoreState) => ({ board, server })


const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    onSet: (idx: number, server: Server, board: logic.Board) => {
        if (server.game < 0) {
            dispatch(actions.set(idx))
        } else if (server.player === board.colorToMove) {
            dispatch(asyncActions.send(server.game, idx, board.colorToMove));
        }
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Board as any);
