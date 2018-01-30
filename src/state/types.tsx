import { Board } from '../logic/TicTacToe';
import { Server } from '../logic/Server';

export type Optional<T> = T | undefined;

export interface StoreState {
    board: Board;
    server: Server;
} 
