import { Repeat } from 'immutable';

import { List } from 'immutable';

export enum FieldValue {
  Empty, X, O
}

export interface Board {
  fields: List<FieldValue>;
  colorToMove: FieldValue.X | FieldValue.O;  
}

export const flipColorToMove = (color: FieldValue.X | FieldValue.O) => color === FieldValue.X ? FieldValue.O : FieldValue.X

export const updateBoard = ({fields, colorToMove}: Board, idx: number) => ({
    fields: fields.set(idx, colorToMove),
    colorToMove: flipColorToMove(colorToMove)
})

export const initialBoard : Board = {
       fields: Repeat(FieldValue.Empty, 9).toList(),
       colorToMove: FieldValue.X
}       
