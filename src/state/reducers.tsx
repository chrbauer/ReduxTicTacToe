import { handleActions } from 'redux-actions';
import { combineReducers } from "redux";

import { StoreState } from './types';
import { Board, Player, initialBoard, updateBoard } from '../logic/Logic';
import { Server, ServerState, initialServer } from '../logic/Server';

const board = handleActions({
    SET: ((board : Board, action: { payload: number }) =>  updateBoard(board, action.payload)) as any,
    NEW: ((board : Board, action: { payload: number }) => initialBoard) as any
}, initialBoard);


const server = handleActions({
    FINDMATCH_ENDED: ((server: Server, action: { myColor: Player, game: number}) => ({ ...server, state: ServerState.Playing})) as any,
    FINDMATCH_SUCCEEDED: (server, { payload } ) => ({ ...server, ...payload }),
     FINDMATCH_STARTED: (server) => ({ ...server, state: ServerState.Searching})
}, initialServer);



type Action = any;
type RootReducer = (state: StoreState) => (action: Action) => StoreState;

export const rootReducer : RootReducer  = combineReducers({ board, server}) as RootReducer;
