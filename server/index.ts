const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const logic = require('../src/logic/Logic');

let room = {
    partner: null
};

let games = [];

function sendJSON(res, obj) {
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
        console.log("Found Match");
        const game = games.length;
        const initialGameState = {
            moves: [],
            board: logic.initialBoard,
            colorToMove: 'X',
            state: "P",
            observers: []
        };
        games.push(initialGameState);
        sendJSON(room.partner, {
            game,
            player: logic.PlayerX
        });
        sendJSON(res, {
            game,
            player: logic.PlayerO
        });
        room.partner = null;
    } else {
        console.log("Wait for Partner...");
        room.partner = res;
    }
});



app.get('/game/:num', function(req, res) {
    const game = req.params.num;
    if (game >= 0 && game < games.length) {
        const gameState = games[game];
        if (req.body.move && req.body.move >= game.moves.length) {
            game.observer.push(res);
        } else {
            res.status(200).send(JSON.stringify({
                move: gameState.moves[req.body.move],
                done: false
            }));
        }
    } else {
        res.status(404).send({ message: "no such game" })
    }
});


app.post('/game/:num', function(req, res) {
    const game = req.params.num;
    if (game >= 0 && game < games.length) {
        const gameState = games[game];
        console.log("B", req.body, gameState);
        if (req.body.set != null) {
            console.log("body", req.body);
            if (true || req.body.color === gameState.colorToMove) {
                gameState.moves.push(req.body.set);
                gameState.board = logic.updateBoard(gameState.board, req.body.set);
                const observers = gameState.observers;
                gameState.observers = [];
                console.log(" obs count", observers.length);
                for (let obs of observers) {
                    console.log("resp to obs", obs.getmove);
                    if (gameState.moves.length > obs.getmove) {
                        obs.res.status(200).send(JSON.stringify({
                            move: gameState.moves[obs.getmove],
                            colorToMove: gameState.board.colorToMove,
                            done: !logic.isEditable(gameState.board)
                        }));
                    } else {
                        gameState.observers.push(obs);
                    }
                }
            }
            sendJSON(res, { ok: 1 });
        } else if (req.body.getmove != null) {
            console.log("C");
            if (req.body.getmove >= gameState.moves.length) {
                console.log("push");
                gameState.observers.push({ getmove: req.body.getmove, player: req.body.player, res });
            } else {
                console.log("resp");
                sendJSON(res, JSON.stringify({
                    move: gameState.moves[req.body.getmove],
                    colorToMove: gameState.board.colorToMove,
                    done: !logic.isEditable(gameState.board)
                }));
            }
        } else {
            console.log("D");
        }
    } else {
        res.status(404).send({ message: "no such game" })
    }
});



const server = app.listen(3333, function() {
    console.log('TTT Server listening on port 3333!');
});


server.timeout = 1000 * 60 * 60; // 1h
console.log("Ready");
