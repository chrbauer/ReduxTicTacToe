import * as React from 'react';
import {BOARD_SIZE, BOARD_PADDING, FIELD_SIZE} from '../constants/Layout';

import Field from './Field';

import './Board.css';

export interface Props {
}

const TTTGrid = () =>  {
   return (
       <g className="grid">
         {[1, 2].map(
	     shift =>
		 (
		     <g key={shift}>
		       <line x1={FIELD_SIZE*shift} y1="0" x2={FIELD_SIZE*shift} y2={BOARD_SIZE} />
     		       <line x1="0" y1={FIELD_SIZE*shift} x2={BOARD_SIZE} y2={FIELD_SIZE*shift}  />
		     </g>
  		 ))}
       </g>)
};

class Board extends React.Component<Props, object> {
  render() {
    // const {  enthusiasmLevel = 1 } = this.props;

      const svgSize = BOARD_SIZE + 2* BOARD_PADDING;
      
      return (
	  <svg width={svgSize} height={svgSize} >
	    <g transform={`translate(${BOARD_PADDING},${BOARD_PADDING}`}  >
	      <TTTGrid />
	      <g className="marker">
		<Field x={1} y={1} />
              </g>
	    </g>
	  </svg>
    );
  }
}

export default Board;
