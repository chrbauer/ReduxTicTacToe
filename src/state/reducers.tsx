import { handleActions } from 'redux-actions';
import { combineReducers } from "redux";

import { StoreState } from './types';
import { Board, Player, PlayerX, initialBoard, updateBoard } from '../logic/Logic';
import { Server, OnlineState, initialServer } from '../logic/Server';

const board = handleActions({
    SET: ((board: Board, action: { payload: number }) => updateBoard(board, action.payload)) as any,
    NEW: ((board: Board, action: { payload: number }) => initialBoard) as any,
    FINDMATCH_SUCCEEDED: ((board: Board, action: { payload: number }) => initialBoard) as any
}, initialBoard);


const server = handleActions({
    NEW: ((server: Server, action: { myColor: Player, game: number }) => ({ ...server, connected: false })) as any,
    FINDMATCH_SUCCEEDED: (server: Server, { payload }: any) => ({
        ...server,
        ...payload,
        onlineState: OnlineState.Playing,
        connected: true,
        colorToMove: PlayerX
    }),
    FINDMATCH_FAILED: (server, { payload }) => ({
        ...server,
        onlineState: OnlineState.Error,
        connected: false,
        errorMsg: (payload as any).message || "Error"
    }),
    FINDMATCH_STARTED: (server) => ({
        ...server,
        errorMsg: "",
        onlineState: OnlineState.FindMatch
    }),
    FOLLOWGAME_SUCCEEDED: (server, { payload }: any) => ({
        ...server,
        colorToMove: payload.colorToMove,
        onlineState: payload.done ? OnlineState.NotPlaying : server.onlineState
    })
}, initialServer);



type Action = any;
type RootReducer = (state: StoreState) => (action: Action) => StoreState;

export const rootReducer: RootReducer = combineReducers({ board, server }) as RootReducer;
