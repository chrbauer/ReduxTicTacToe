import ServerInfo from '../components/ServerInfo';
//import { actions, asyncActions}  from '../state/actions';
import { StoreState } from '../state/types';
import { connect } from 'react-redux';

const mapStateToProps = ({ server }: StoreState) => ({ server })



export default connect(mapStateToProps)(ServerInfo);
