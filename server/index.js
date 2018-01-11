const express = require('express');
const app = express();

let room = {
    id: 0,
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


app.post('/findmatch', function (req, res) {
    if( room.partner != null ) {
	console.log("Found Match");

	sendJSON( room.partner, {
	    game: room.id,
	    player: 'X'
	});
	sendJSON( res, {
	    game: room.id,
	    player: 'O'
	});
	room.id++;
	room.partner = null;
    } else {
	console.log("Wait for Partner...");
	room.partner = res;
    }
});

const server = app.listen(3333, function () {
  console.log('TTT Server listening on port 3333!');
});


server.timeout = 1000 * 60 * 60; // 1h
console.log("Ready");
