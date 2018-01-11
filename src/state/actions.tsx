/// <references path="./redux-thunk-actions.d.ts" />

import { createActions } from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';
//import { Dispatch } from "redux";
import { SERVER_URI } from '../constants/Server';

export const actions = createActions({
    NEW: undefined,
    SET: undefined,
});

export const asyncActions = {				     
    findmatch: createActionThunk('FINDMATCH',
   				 () => fetch(`${SERVER_URI}/findmatch`, { mode: 'cors', method: 'POST' })
	      			 .then(response => response.json()))
}


export default actions
