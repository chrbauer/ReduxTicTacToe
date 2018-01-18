import { Board } from '../logic/TicTacToe';
import { Server } from '../logic/Server';


export interface StoreState {
    board: Board
    server: Server;
}
