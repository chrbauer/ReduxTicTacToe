import ActionButtons from '../components/ActionButtons';
import actions from '../state/actions';
import { StoreState } from '../state/types';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = ({server}: StoreState) => ({server})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
      onFindMatch: () => dispatch(actions.findmatch())
})
 

export default connect(mapStateToProps,  mapDispatchToProps)(ActionButtons as any);