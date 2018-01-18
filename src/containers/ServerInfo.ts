import ServerInfo from '../components/ServerInfo';
import { StoreState } from '../state/types';
import { connect } from 'react-redux';

const mapStateToProps = ({ server }: StoreState) => ({ server });

export default connect(mapStateToProps)(ServerInfo);
