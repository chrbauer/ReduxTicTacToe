import { handleActions, ActionMeta } from 'redux-actions';
import { combineReducers, Reducer } from 'redux';

import { StoreState } from './types';
import { Board, Player, initialBoard, updateBoard } from '../logic/TicTacToe';
import { Server, OnlineState, initialServer } from '../logic/Server';



const boardReducer = handleActions(
    {
        SET: ((board: Board, action: ActionMeta<number, {}>) => updateBoard(board, action.payload || 0)),
        NEW: ((board: Board) => initialBoard),
        FINDMATCH_SUCCEEDED: ((board: Board) => initialBoard)
    },
    initialBoard
);

const serverReducer = handleActions(
    {
        NEW: ((server: Server, action: { myColor: Player, game: number }) => ({ ...server, connected: false })) as any,
        FINDMATCH_SUCCEEDED: (server: Server, { payload }: any) => ({
            ...server,
            ...payload,
            onlineState: OnlineState.Playing,
            connected: true,
            colorToMove: Player.X
        }),
        FINDMATCH_FAILED: (server, { payload }) => ({
            ...server,
            onlineState: OnlineState.Error,
            connected: false,
            errorMsg: (payload as any).message || 'Error'
        }),
        FINDMATCH_STARTED: (server) => ({
            ...server,
            errorMsg: '',
            onlineState: OnlineState.FindMatch
        }),
        FOLLOWGAME_SUCCEEDED: (server, { payload }: any) => ({
            ...server,
            colorToMove: payload.colorToMove,
            onlineState: payload.done ? OnlineState.NotPlaying : server.onlineState,
            resigned: payload.resigned
        })
    },
    initialServer
);

export type RootReducer = Reducer<StoreState>;

export const rootReducer: RootReducer = combineReducers({
    board: boardReducer,
    server: serverReducer
});
