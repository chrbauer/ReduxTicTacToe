import { Player } from './TicTacToe';

const SERVER_URI = `http://${window.location.hostname}:3333`;

export enum OnlineState {
    Playing, NotPlaying, FindMatch, Error
}

export interface Server {
    connected: boolean;
    game: number;
    onlineState: OnlineState;
    player: Player;
    playerToMove: Player;
    errorMsg: string;
    resigned: Player;
}

export const initialServer: Server = {
    connected: false,
    game: -1,
    onlineState: OnlineState.NotPlaying,
    player: Player.X,
    playerToMove: Player.X,
    errorMsg: '',
    resigned: Player.Nobody
};

const query = <Response>(route: string, params = {}): Promise<Response> =>
    fetch(`${SERVER_URI}/${route}`, {
        mode: 'cors',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(params)
    }).then(response => response.json());

export interface FindMatchResponse {
    game: number;
    player: Player;
}

export interface MoveResponse {
    move: number;
    playerToMove: Player;
    done: boolean;
    resigned: Player;
}

export const findMatch = (): Promise<FindMatchResponse> => query("findmatch");

const queryGame = (game: number, params: object) => query<MoveResponse>(`game/${game}`, params);
export const followGame = (game: number, getmove: number, player: Player): Promise<MoveResponse> =>
    queryGame(game, { getmove, player });
export const sendMove = (game: number, set: number, color: Player): Promise<any> =>
    queryGame(game, { color, set });

export const resign = (game: number, color: Player): Promise<any> =>
    queryGame(game, { resign: true, color });

