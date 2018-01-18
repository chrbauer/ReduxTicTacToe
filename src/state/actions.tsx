/// <references path="./redux-thunk-actions.d.ts" />

import { createActions } from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';
import { Dispatch } from "redux";

import { Player } from '../logic/TicTacToe';
import { StoreState } from './types';

import * as server from '../logic/Server';

export const actions = createActions({
    NEW: undefined,
    SET: undefined,
});

const sideeffect = (f: ((r: JSON) => void)) => (arg: JSON) => {
    console.log("arg", arg);
    f(arg);
    return arg;
};

interface AsyncActionMetaData {
    dispatch: Dispatch<any>;
    getState: () => StoreState;
}

export const asyncActions = {
    findmatch: createActionThunk('FINDMATCH',
        ({ dispatch }: { dispatch: Dispatch<any> }) =>
            server.findMatch()
                .then(sideeffect((response: any) => dispatch(asyncActions.followGame(response.game as number, 0))))) as any,
    followGame: createActionThunk('FOLLOWGAME',
        (game: number, move: number, { dispatch, getState }: AsyncActionMetaData) =>
            server.followGame(game, move, getState().server.player)
                .then(sideeffect((response: any) => {
                    console.log("resp", response);
                    dispatch(actions.set(response.move));
                    if (!response.done) {
                        dispatch(asyncActions.followGame(game, move + 1));
                    }
                }))
    ),
    send: createActionThunk('SEND',
        (game: number, index: number, color: Player, { getState }: AsyncActionMetaData) => {
            server.sendMove(game, index, getState().server.player)
        })
} as any;


export default actions;
