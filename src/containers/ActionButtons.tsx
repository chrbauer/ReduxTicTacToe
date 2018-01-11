import ActionButtons from '../components/ActionButtons';
import { asyncActions}  from '../state/actions';
import { StoreState } from '../state/types';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = ({server}: StoreState) => ({server})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
      onFindMatch: () => dispatch(asyncActions.findmatch())
})
 

export default connect(mapStateToProps,  mapDispatchToProps)(ActionButtons as any);