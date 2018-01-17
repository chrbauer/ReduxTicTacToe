import { Repeat } from 'immutable';
import { List } from 'immutable';

export const COLUMNS = 3;

export enum FieldValue {
    Empty, X, O
}

export type Player = FieldValue.X | FieldValue.O;

export const PlayerX = FieldValue.X;
export const PlayerO = FieldValue.O;

export enum Phase {
    NotStarted, Playing, WinX, WinO, Draw
}

export type Fields = List<FieldValue>;
export interface Board {
    fields: Fields;
    colorToMove: Player;
    phase: Phase;
}


export const initialBoard: Board = {
    fields: Repeat(FieldValue.Empty, 9).toList(),
    colorToMove: FieldValue.X,
    phase: Phase.NotStarted
}


export const updateBoard = (board: Board, idx: number) => {
    const { fields, colorToMove } = board;
    if (isEditable(board) && fields.get(idx) === FieldValue.Empty) {
        const newFields = fields.set(idx, colorToMove);
        return {
            fields: newFields,
            colorToMove: flipColorToMove(colorToMove),
            phase: phaseOfBoard(newFields)
        }
    }
    return board;
}

export const flipColorToMove = (color: Player) => color === FieldValue.X ? FieldValue.O : FieldValue.X

export const column = (idx: number): number => idx % COLUMNS
export const row = (idx: number): number => ~~(idx / COLUMNS)
export const isDiag1 = (idx: number): boolean => column(idx) == row(idx)
export const isDiag2 = (idx: number): boolean => 2 - column(idx) == row(idx)

export const isEditable = (board: Board): boolean => {
    return board.phase === Phase.Playing || board.phase === Phase.NotStarted;
}

function checkWinOneCond<T>(fields: Fields, player: Player, selector: (n?: number) => T, fixPoint: T) {
    return fields.filter((field, idx) => selector(idx) == fixPoint && field === player).count() === 3;
}

const checkWin = (fields: Fields, player: Player) => {
    const range = [0, 1, 2];
    return range.some(r => checkWinOneCond(fields, player, row, r) || checkWinOneCond(fields, player, column, r)) ||
        checkWinOneCond(fields, player, isDiag1, true) ||
        checkWinOneCond(fields, player, isDiag2, true);
}

const isEmpty = (field: FieldValue) => field === FieldValue.Empty

export const phaseOfBoard = (fields: List<FieldValue>) => {
    if (fields.every(isEmpty)) return Phase.NotStarted;
    if (checkWin(fields, FieldValue.X))
        return Phase.WinX;
    if (checkWin(fields, FieldValue.O))
        return Phase.WinO;

    if (!fields.some(isEmpty))
        return Phase.Draw;
    return Phase.Playing;
}
