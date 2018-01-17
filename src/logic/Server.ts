import { Player, PlayerX } from './Logic';

export enum OnlineState {
    Playing, NotPlaying, FindMatch, Error
}


export interface Server {
    connected: boolean;
    game: number;
    onlineState: OnlineState;
    player: Player;
    colorToMove: Player;
    errorMsg: string;
}

export const initialServer: Server = {
    connected: false,
    game: -1,
    onlineState: OnlineState.NotPlaying,
    player: PlayerX,
    colorToMove: PlayerX,
    errorMsg: ""
}


