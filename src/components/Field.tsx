import * as React from 'react';
import { FIELD_SIZE } from '../constants/Layout';
import * as logic from '../logic/TicTacToe';

import Cross from './Cross';
import Circle from './Circle';

export interface Props {
    x: number;
    y: number;
    value: logic.FieldValue;
    onClick: () => void;
}

class Field extends React.Component<Props, object> {
    render() {
        const { x, y, value } = this.props;
	const isEmpty = value === logic.FieldValue.Empty;
        return (
            <g transform={`translate(${x * FIELD_SIZE}, ${y * FIELD_SIZE})`} >
                <rect fill="transparent" stroke="none" width={FIELD_SIZE} height={FIELD_SIZE} onClick={ isEmpty && this.props.onClick || undefined} />
                {value === logic.FieldValue.O ? <Circle /> : (value === logic.FieldValue.X ? <Cross /> : null)}
            </g>
        );
    }
}

export default Field;
