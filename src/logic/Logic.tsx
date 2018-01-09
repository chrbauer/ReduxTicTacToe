import { Repeat } from 'immutable';

import { List } from 'immutable';

export enum FieldValue {
  Empty, X, O
}

export type Board = List<FieldValue>;


export const updateBoard = (board: Board, idx: number) => board.set(idx, FieldValue.X);
export const initialBoard : Board = Repeat(FieldValue.Empty, 9).toList();	