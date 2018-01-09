import Board from '../components/Board';
import actions from '../state/actions';
import { StoreState } from '../state/types';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = ({ board }: StoreState) => ({board})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({ onSet: (idx: number) => dispatch(actions.set( idx ))})
 

export default connect(mapStateToProps,  mapDispatchToProps)(Board as any);