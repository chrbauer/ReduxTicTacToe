/// <reference types="node" />

// required modules
const express = require('express');
const bodyParser = require("body-parser");
const ttt = require('../src/logic/TicTacToe');

const app = express();

let room = {
    partner: null
};

let games = [];

function sendJSON(res, obj: object): void {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(obj));
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/findmatch', function(req, res) {
    if (room.partner != null) {
        const game = games.length;
        const initialGameState = {
            moves: [],
            board: ttt.initialBoard,
            colorToMove: ttt.playerX,
            observers: [],
            resigned: ttt.Nobody
        };
        games.push(initialGameState);
        sendJSON(room.partner, {
            game,
            player: ttt.PlayerX
        });
        sendJSON(res, {
            game,
            player: ttt.PlayerO
        });
        room.partner = null;
    } else {
        console.log("Wait for Partner...");
        room.partner = res;
    }
});

function sendMove(res, gameState, moveIdx) {
    sendJSON(res, {
        move: gameState.moves[moveIdx],
        colorToMove: gameState.board.colorToMove,
        done: gameState.resigned !== ttt.Nobody || !ttt.isEditable(gameState.board),
        resigned: gameState.resigned
    });
}

function setMarker(gameState, idx) {
    gameState.moves.push(idx);
    gameState.board = ttt.updateBoard(gameState.board, idx);
    const observers = gameState.observers;
    gameState.observers = [];
    for (let obs of observers) {
        if (gameState.moves.length > obs.getmove) {
            sendMove(obs.res, gameState, obs.getmove);
        } else {
            gameState.observers.push(obs);
        }
    }
}

function resign(gameState, player) {
    gameState.resign = player;
    const observers = gameState.observers;
    gameState.observers = [];
    for (let obs of observers) {
        sendMove(obs.res, gameState, gameState.moves.length);
    }
}


function delayObserverResponse(gameState, obs, getmove) {
    gameState.observers.push({ getmove, res: obs });
}

app.post('/game/:num', function(req, res) {
    const game = req.params.num;
    if (game >= 0 && game < games.length) {
        const gameState = games[game];

        if (req.body.set != null) {
            if (req.body.color === gameState.board.colorToMove) {
                const moveIdx = gameState.moves.length;
                setMarker(gameState, req.body.set);
                sendMove(res, gameState, moveIdx);
                return;
            }
        } else if (req.body.getmove != null) {
            const moveIdx = req.body.getmove;
            if (moveIdx >= gameState.moves.length) {
                delayObserverResponse(gameState, res, moveIdx);
            } else {
                sendMove(res, gameState, moveIdx);
            }
            return;
        } else if (req.body.resign && ttt.players.indexOf(req.body.color) != -1) {
            const moveIdx = gameState.moves.length;
            resign(gameState, req.body.color);
            sendMove(res, gameState, moveIdx);
        }
        res.status(400).send({ message: "invalid request" });
    } else {
        res.status(404).send({ message: "no such game" })
    }
});

const server = app.listen(3333, function() {
    console.log('TTT Server listening on port 3333!');
});


server.timeout = 1000 * 60 * 60; // 1h >= duration(IT_Talk)
console.log("Started");
