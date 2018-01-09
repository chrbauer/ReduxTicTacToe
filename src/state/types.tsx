//<reference path='../node_modules/immutable/dist/immutable.d.ts'/>

import { List } from 'immutable';

export enum FieldValue {
  Empty, X, O
}

export type Board = List<FieldValue>;

export interface StoreState {
   board: Board
}