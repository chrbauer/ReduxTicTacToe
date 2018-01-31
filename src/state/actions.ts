/// <references path="./redux-thunk-actions.d.ts" />

import { createActions } from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';
import { Dispatch } from "redux";

import { StoreState } from './types';

import * as server from '../logic/Server';

interface AsyncActionMetaData {
    dispatch: Dispatch<any>;
    getState: () => StoreState;
}

export const actions = createActions({
    NEW: undefined,
    SET: undefined,
});

const sideeffect = <T>(f: ((r: T) => void)) => (arg: T) => {
    f(arg);
    return arg;
};

export const asyncActions = {
    findmatch: createActionThunk('FINDMATCH',
        ({ dispatch }: AsyncActionMetaData) =>
            server.findMatch()
                .then(sideeffect((response: server.FindMatchResponse) =>
                    dispatch(asyncActions.followGame(response.game as number, 0))))),
    followGame: createActionThunk('FOLLOWGAME',
        (game: number, move: number, { dispatch, getState }: AsyncActionMetaData) =>
            server.followGame(game, move, getState().server.player)
                .then(sideeffect((response: any) => {
                    dispatch(actions.set(response.move));
                    if (!response.done) {
                        dispatch(asyncActions.followGame(game, move + 1));
                    }
                }))
    ),
    send: createActionThunk('SEND',
        (game: number, index: number, { getState }: AsyncActionMetaData) => {
            server.sendMove(game, index, getState().server.player);
        }),
    resign: createActionThunk('RESIGN',
        ({ getState }: AsyncActionMetaData) => {
            const state = getState();
            server.resign(state.server.game, state.server.player);
        })
};


export default actions;
