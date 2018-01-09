import * as React from 'react';
import {FIELD_SIZE} from '../constants/Layout';

import './Cross.css';



class Cross extends React.Component<{}, object> {
  onClick = () => {
     //console.log("BING");
  }

  render() {
    return (
      <g className="cross" >
	 <line  x1={FIELD_SIZE/4} y1={FIELD_SIZE/4} x2={3*FIELD_SIZE/4} y2={3*FIELD_SIZE/4}  />
	 <line  x2={FIELD_SIZE/4} y1={FIELD_SIZE/4} x1={3*FIELD_SIZE/4} y2={3*FIELD_SIZE/4}  />		
      </g>
    );
  }

}

export default Cross
