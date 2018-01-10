import { handleActions } from 'redux-actions';

import { StoreState } from './types';
import { initialBoard, updateBoard } from '../logic/Logic';



const initialState =  {
    board: initialBoard
};

export const rootReducer = handleActions({
    SET: ((state : StoreState, action: { payload: number }) => ({
         ...state, board: updateBoard(state.board, action.payload)
    })) as any,
    NEW: ((state : StoreState, action: { payload: number }) => initialState) as any
}, initialState);
