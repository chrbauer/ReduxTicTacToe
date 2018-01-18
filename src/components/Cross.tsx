import * as React from 'react';
import { FIELD_SIZE } from '../constants/Layout';

class Cross extends React.Component<{}, object> {
    render() {
        return (
            <g className="marker">
                <line x1={FIELD_SIZE / 4} y1={FIELD_SIZE / 4} x2={3 * FIELD_SIZE / 4} y2={3 * FIELD_SIZE / 4} />
                <line x2={FIELD_SIZE / 4} y1={FIELD_SIZE / 4} x1={3 * FIELD_SIZE / 4} y2={3 * FIELD_SIZE / 4} />
            </g>
        );
    }
}

export default Cross;
