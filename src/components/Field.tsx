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
    const {  x, y, value } = this.props;
    return (
      <g transform={`translate(${x*FIELD_SIZE}, ${y*FIELD_SIZE})`} >
         <rect fill="transparent" stroke="none" width={FIELD_SIZE} height={FIELD_SIZE} onClick={this.onClick} />
        { value === "O" ? <Circle /> : (value === "X" ?  <Cross /> : null ) }
      </g>
    );
  }

}

export default Field;
