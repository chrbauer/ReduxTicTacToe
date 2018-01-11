declare module 'redux-thunk-actions' {
    export function createActionThunk(
	actionType: string,
	payloadCreator: Function
    ): any;
}
