import { Reducer, AnyAction } from 'redux';

export interface Timings {
    started: object;
    completed: object;
}

const initial = {
    started: {},
    completed: {}
}

export const timingsReducer: Reducer<Timings> = (timings = initial, action: AnyAction): Timings => {
    if (action.hasOwnProperty("timestamp")) {
        const [actionKey, subType] = action.type.split("_");
        const { started, completed } = timings;
        switch (subType) {
            case "STARTED": return {
                ...timings,
                started: {
                    ...started, [actionKey]: action.timestamp
                }
            }
            case "ENDED": return {
                started: {
                    ...started, [actionKey]: undefined
                },
                completed: {
                    ...completed,
                    [actionKey]: (completed[actionKey] || []).concat(action.timestamp - started[actionKey])
                }
            }
            default: break;
        }
    }
    return timings;
}
