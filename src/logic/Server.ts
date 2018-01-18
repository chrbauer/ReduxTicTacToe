import { Player } from './TicTacToe';
import { SERVER_URI } from '../constants/Server';

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

const query = (route: string, params = {}): Promise<JSON> =>
    fetch(`${SERVER_URI}/${route}`, {
        mode: 'cors',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(params)
    }).then(response => response.json());

export const findMatch = (): Promise<JSON> => query("findmatch");

const queryGame = (game: number, params: object) => query(`game/${game}`, params);
export const followGame = (game: number, getmove: number, player: Player): Promise<JSON> =>
    queryGame(game, { getmove, player });
export const sendMove = (game: number, set: number, color: Player): Promise<JSON> =>
    queryGame(game, { color, set });

export const resign = (game: number, color: Player): Promise<JSON> =>
    queryGame(game, { resign: true, color });

