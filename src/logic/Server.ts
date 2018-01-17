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
    gameState: GameState;
    player: Player;
    colorToMove: Player;
    state: ServerState;
    errorMsg: string;
}

export const initialServer: Server = {
    connected: false,
    game: -1,
    gameState: GameState.Waiting,
    player: PlayerX,
    colorToMove: PlayerX,
    state: ServerState.NotConnected,
    errorMsg: ""
}


