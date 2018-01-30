import { Repeat } from 'immutable';
import { List } from 'immutable';

export const COLUMNS = 3;

export enum Player {
    Nobody, X, O
}

export const Players = [Player.X, Player.O];

export enum Phase {
    NotStarted, Playing, WinX, WinO, Draw
}

export type Fields = List<Player>;
export interface Board {
    fields: Fields;
    colorToMove: Player;
    phase: Phase;
}

export const initialBoard: Board = {
    fields: Repeat(Player.Nobody, 9).toList(),
    colorToMove: Player.X,
    phase: Phase.NotStarted
};

export const updateBoard = (board: Board, idx: number): Board => {
    const { fields, colorToMove } = board;
    if (isEditable(board) && fields.get(idx) === Player.Nobody) {
        const newFields = fields.set(idx, colorToMove);
        return {
            fields: newFields,
            colorToMove: flipColorToMove(colorToMove),
            phase: phaseOfBoard(newFields)
        };
    }
    return board;
};

export const flipColorToMove = (color: Player) => color === Player.X ? Player.O : Player.X;

export const column = (idx: number): number => idx % COLUMNS;
export const row = (idx: number): number => ~~(idx / COLUMNS);
const onDiag1 = (idx: number): boolean => column(idx) === row(idx);
const onDiag2 = (idx: number): boolean => 2 - column(idx) === row(idx);
const count3Marks = (fields: Fields, player: Player, select: (idx: number) => boolean) => fields.filter((field, idx: number) => select(idx) && field === player).count() === 3
const onRow = (r: number) => (idx: number) => row(idx) === r;
const onColumn = (c: number) => (idx: number) => column(idx) === c;
const checkWin = (fields: Fields, player: Player) =>
    [0, 1, 2].some(rc => count3Marks(fields, player, onRow(rc)) || count3Marks(fields, player, onColumn(rc))) ||
    count3Marks(fields, player, onDiag1) || count3Marks(fields, player, onDiag2);


export const isEditable = (board: Board): boolean => {
    return board.phase === Phase.Playing || board.phase === Phase.NotStarted;
};
const isEmpty = (field: Player) => field === Player.Nobody;

export const phaseOfBoard = (fields: List<Player>) => {
    if (fields.every(isEmpty)) {
        return Phase.NotStarted;
    } else if (checkWin(fields, Player.X)) {
        return Phase.WinX;
    } else if (checkWin(fields, Player.O)) {
        return Phase.WinO;
    } else if (!fields.some(isEmpty)) {
        return Phase.Draw;
    } else {
        return Phase.Playing;
    }
};
