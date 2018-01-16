import Board from '../components/Board';
import { actions, asyncActions} from '../state/actions';
import { StoreState } from '../state/types';
import { connect, Dispatch } from 'react-redux';
import { Player } from '../logic/Logic';
import { Server } from '../logic/Server';

const mapStateToProps = ({ board, server }: StoreState) => ({board, server})


const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    onSet: (idx: number, color: Player, server: Server) => {
	if( server.game < 0 ) {
	    dispatch(actions.set( idx ))
	} else {
	    dispatch(asyncActions.send(server.game, idx, color));
	}
    }
})
 

export default connect(mapStateToProps,  mapDispatchToProps)(Board as any);
