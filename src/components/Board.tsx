import * as React from 'react';
import {BOARD_SIZE, BOARD_PADDING, FIELD_SIZE} from '../constants/Layout';
import Field from './Field';
import * as logic from '../logic/Logic';
import './Board.css';

export interface Props {
    board: logic.Board;
    onSet: (idx: number) => void;
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
      const { board } = this.props;

      const svgSize = BOARD_SIZE + 2* BOARD_PADDING;
      
      return (
	  <div>
	  <svg width={svgSize} height={svgSize} >
	    <g transform={`translate(${BOARD_PADDING},${BOARD_PADDING})`}  >
	      <TTTGrid />
	      { board.fields.map( (value: logic.FieldValue, idx: number) => (
		      <Field x={logic.column(idx)} y={logic.row(idx)} value={value} onClick={() => this.props.onSet(idx)} />
	      ))}
	    </g>
	      </svg>
	      <p>
	      <span> {logic.Phase[board.phase]} </span>
	      </p>
        </div>
    );
  }
}

export default Board;
