import { handleActions } from 'redux-actions';
import { combineReducers } from "redux";

import { StoreState } from './types';
import { Board, Player, PlayerX, initialBoard, updateBoard } from '../logic/Logic';
import { Server, ServerState, GameState, initialServer } from '../logic/Server';

const board = handleActions({
    SET: ((board: Board, action: { payload: number }) => updateBoard(board, action.payload)) as any,
    NEW: ((board: Board, action: { payload: number }) => initialBoard) as any,
    FINDMATCH_SUCCEEDED: ((board: Board, action: { payload: number }) => initialBoard) as any
}, initialBoard);


const server = handleActions({
    FINDMATCH_ENDED: ((server: Server, action: { myColor: Player, game: number }) => ({ ...server, state: ServerState.Playing })) as any,
    FINDMATCH_SUCCEEDED: (server, { payload }: any) => ({
        ...server,
        ...payload,
        gameState: GameState.Playing,
        connected: true,
        myturn: payload!.player === PlayerX
    }),
    FINDMATCH_FAILED: (server, { payload }) => ({
        ...server,
        gameState: GameState.Error,
        connected: false,
        errorMsg: (payload as any).message || "Error"
    }),
    FINDMATCH_STARTED: (server) => ({
        ...server,
        errorMsg: "",
        gameState: GameState.FindMatch,
        state: ServerState.Searching
    }),
    FOLLOWGAME_SUCCEEDED: (server, { payload }: any) => ({
        ...server,
        colorToMove: payload.colorToMove,
        gameState: payload.done ? GameState.Finished : server.gameState
    })
}, initialServer);



type Action = any;
type RootReducer = (state: StoreState) => (action: Action) => StoreState;

export const rootReducer: RootReducer = combineReducers({ board, server }) as RootReducer;
