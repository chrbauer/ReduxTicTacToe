import ActionButtons from '../components/ActionButtons';
import { actions, asyncActions } from '../state/actions';
import { StoreState } from '../state/types';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = ({ server }: StoreState) => ({ server });

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    onFindMatch: () => dispatch(asyncActions.findmatch()),
    onNewGame: () => dispatch(actions.new()),
    onResign: () => { return; }
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons as any);
