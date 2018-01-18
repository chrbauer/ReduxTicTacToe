import * as React from 'react';
import { FIELD_SIZE } from '../constants/Layout';
import * as ttt from '../logic/TicTacToe';

import Cross from './Cross';
import Circle from './Circle';

export interface Props {
    x: number;
    y: number;
    value: ttt.Player;
    onClick: () => void;
}

class Field extends React.Component<Props, object> {
    render() {
        const { x, y, value } = this.props;
        const isEmpty = value === ttt.Player.Nobody;
        return (
            <g transform={`translate(${x * FIELD_SIZE}, ${y * FIELD_SIZE})`} >
                <rect
                    fill="transparent"
                    stroke="none"
                    width={FIELD_SIZE}
                    height={FIELD_SIZE}
                    onClick={isEmpty && this.props.onClick || undefined}
                />
                {value === ttt.Player.O ? <Circle /> : (value === ttt.Player.X ? <Cross /> : null)}
            </g>
        );
    }
}

export default Field;
