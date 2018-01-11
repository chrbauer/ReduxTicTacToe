import { Player, PlayerX } from './Logic';

export enum ServerState {
   Playing, Searching, NotConnected
}

export interface Server {
   gameId: number;
   myColor: Player;
   state: ServerState;
}

export const initialServer : Server = {
       gameId: -1,
       myColor: PlayerX,
       state: ServerState.NotConnected
}
