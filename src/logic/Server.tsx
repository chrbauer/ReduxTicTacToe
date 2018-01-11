import { Player, PlayerX } from './Logic';

export enum ServerState {
   Playing, Searching, NotConnected
}

export interface Server {
   game: number;
   myColor: Player;
   state: ServerState;
}

export const initialServer : Server = {
       game: -1,
       myColor: PlayerX,
       state: ServerState.NotConnected
}


