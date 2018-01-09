//<reference path='../node_modules/immutable/dist/immutable.d.ts'/>

import { List } from 'immutable';

export enum FieldValue {
  Empty, X, O
}

export interface StoreState {
   board: List<FieldValue>
}