import * as React from 'react';
import {FIELD_SIZE} from '../constants/Layout';
import * as types from '../state/types';

import Cross from './Cross';
import Circle from './Circle';



export interface Props {
  x: number;
  y: number;
  value: types.FieldValue;
  onClick: () => void;
}


class Field extends React.Component<Props, object> {
  render() {
    const {  x, y, value } = this.props;
    return (
      <g transform={`translate(${x*FIELD_SIZE}, ${y*FIELD_SIZE})`} >
         <rect fill="transparent" stroke="none" width={FIELD_SIZE} height={FIELD_SIZE} onClick={this.props.onClick} />
        { value === types.FieldValue.O ? <Circle /> : (value === types.FieldValue.X ?  <Cross /> : null ) }
      </g>
    );
  }

}

export default Field;
