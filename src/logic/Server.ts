import { Player, PlayerX } from './Logic';

export enum ServerState {
    Playing, Searching, NotConnected
}



export enum GameState {
    Playing, Finished, Waiting, FindMatch, Error
}


export interface Server {
    connected: boolean;
    game: number;
    myturn: boolean;
    gameState: GameState;
    player: Player;
    state: ServerState;
    errorMsg: string;
}

export const initialServer: Server = {
    connected: false,
    myturn: false,
    game: -1,
    gameState: GameState.Waiting,
    player: PlayerX,
    state: ServerState.NotConnected,
    errorMsg: ""
}


