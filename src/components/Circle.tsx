import * as React from 'react';
import {FIELD_SIZE} from '../constants/Layout';

class Cross extends React.Component<{}, object> {
  render() {
    return (
	 <circle className="marker"  cx={FIELD_SIZE/2} cy={FIELD_SIZE/2} r={FIELD_SIZE/3} />
    );
  }

}

export default Cross
