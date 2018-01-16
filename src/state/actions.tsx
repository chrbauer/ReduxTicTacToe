/// <references path="./redux-thunk-actions.d.ts" />

import { createActions } from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';
import { Dispatch } from "redux";
import { SERVER_URI } from '../constants/Server';
import { Player } from '../logic/Logic';

export const actions = createActions({
    NEW: undefined,
    SET: undefined,
});





export const asyncActions = {				     
    findmatch: createActionThunk('FINDMATCH',
   				 ({ dispatch }: { dispatch: Dispatch<any> }) => fetch(`${SERVER_URI}/findmatch`, { mode: 'cors', method: 'POST' })
	      			 .then(response => response.json())
				 .then(response => {
				     dispatch(asyncActions.followGame(response.game as number, 0));
				     return response;
				 })),
    followGame: createActionThunk('FOLLOWGAME',
				  (game: number, move: number, {dispatch}: { dispatch: Dispatch<any> }) => {
				      return fetch(`${SERVER_URI}/game/${game}`, { mode: 'cors',
										   headers: {
										       'Accept': 'application/json, text/plain, */*',
										       'Content-Type': 'application/json'
										   },
										   method: 'POST',
										   body: JSON.stringify( { getmove: move } )  })
	      				  .then(response => response.json())
					  .then(response => {
					      dispatch(actions.set(response.move));
					      if( !response.done ) {
						  dispatch(asyncActions.followGame(game as number, move +1));
					      }
					      return response;
					  });
				  }),
    send:  createActionThunk('SEND',
			     (game: number, index: number, color: Player) => {
				 var data = new FormData();
				 
				 data.append("json", JSON.stringify ({ color, set: index  } ));
				 return fetch(`${SERVER_URI}/game/${game}`, { mode: 'cors',
									       headers: {
										   'Accept': 'application/json, text/plain, */*',
										   'Content-Type': 'application/json'
									       },
									      method: 'POST',
									      body: JSON.stringify ({ color, set: index  } )  })
				     .then(response => console.log("blob", response.blob()))
	      			     //.then(response => response.json());
			     })
    
} as any;


export default actions
