import BoardPhase from '../components/BoardPhase';

import { StoreState } from '../state/types';
import { connect } from 'react-redux';

const mapStateToProps = ({ board }: StoreState) => ({board})

export default connect(mapStateToProps)(BoardPhase as any);