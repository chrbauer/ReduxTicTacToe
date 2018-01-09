import * as React from 'react';
import {FIELD_SIZE} from '../constants/Layout';

import Cross from './Cross';
import Circle from './Circle';

export interface Props {
  x: number;
  y: number;
  value?: string;
}


class Field extends React.Component<Props, object> {
  onClick = () => {
     //console.log("BING");
  }

  render() {
    const {  x, y } = this.props;
    return (
      <g transform={`translate(${x*FIELD_SIZE}, ${y*FIELD_SIZE})`} >
         <rect fill="transparent" stroke="none" width={FIELD_SIZE} height={FIELD_SIZE} onClick={this.onClick} />
	 <circle cx={FIELD_SIZE/2} cy={FIELD_SIZE/2} r={FIELD_SIZE/3}  />
	 <Circle />
	 <Cross />
      </g>
    );
  }

}

export default Field;
