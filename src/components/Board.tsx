import * as React from 'react';
import {BOARD_SIZE, BOARD_PADDING, FIELD_SIZE} from '../constants/Layout';
import Field from './Field';
import * as logic from '../logic/Logic';
import * as server from '../logic/Server';
import './Board.css';

export interface Props {
    board: logic.Board;
    server: server.Server;
    onSet: (idx: number, color: logic.Player, server: server.Server) => void;
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
	  
	  <svg width={svgSize} height={svgSize} >
	    <g transform={`translate(${BOARD_PADDING},${BOARD_PADDING})`}  >
	      <TTTGrid />
	      { board.fields.map( (value: logic.FieldValue, idx: number) => (
		      <Field x={logic.column(idx)} y={logic.row(idx)} value={value} onClick={() => this.props.onSet(idx, board.colorToMove, this.props.server)} />
	      ))}
	    </g>
	      </svg>

    );
  }
}

export default Board;
