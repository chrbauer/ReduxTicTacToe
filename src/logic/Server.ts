import { Player } from './TicTacToe';

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
    resigned: Player;
}

export const initialServer: Server = {
    connected: false,
    game: -1,
    onlineState: OnlineState.NotPlaying,
    player: Player.X,
    colorToMove: Player.X,
    errorMsg: '',
    resigned: Player.Nobody
};
