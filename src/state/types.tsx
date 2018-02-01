import { Board } from '../logic/TicTacToe';
import { Server } from '../logic/Server';

export type Optional<T> = T | undefined;

export interface StoreState {
    board: Board;
    server: Server;
} 

//interface Author {
//    nickname: string;
//}
//interface Message {
//    authorid: number;
//    timestamp: Date;
//    message: string;

//}
//interface ChatStore {
//    authors: Map<number, Author>;
//    messages: List<Message>;
//}