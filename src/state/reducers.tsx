import { handleActions } from 'redux-actions';
import {/* Dispatch,*/ combineReducers } from "redux";

import { StoreState } from './types';
import { Board, initialBoard, updateBoard } from '../logic/Logic';
import { Server, ServerState, initialServer } from '../logic/Server';



const board = handleActions({
    SET: ((board : Board, action: { payload: number }) =>  updateBoard(board, action.payload)) as any,
    NEW: ((board : Board, action: { payload: number }) => initialBoard) as any
}, initialBoard);


const server = handleActions({
    FINDMATCH: ((server : Server, action: any) =>  ({ ...server, state: ServerState.Searching})) as any
}, initialServer);



type Action = any;
type RootReducer = (state: StoreState) => (action: Action) => StoreState;

export const rootReducer : RootReducer  = combineReducers({ board, server}) as RootReducer;
