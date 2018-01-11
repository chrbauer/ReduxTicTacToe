import { Board } from '../logic/Logic';
import { Server } from '../logic/Server';


export interface StoreState {
   board: Board
   server: Server;
}