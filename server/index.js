const express = require('express');
const app = express();

let room = {
    id: 0,
    partner: null
};

let games = [];

app.get('/findmatch', function (req, res) {
    if( room.partner != null ) {
	console.log("Found Match");

	
	room.partner.send(JSON.stringify({
	    matchid: room.id,
	    player: 'X'
	}));
	res.send(JSON.stringify({
	    matchid: room.id,
	    player: 'O'
	}));
	room.id++;
    } else {
	console.log("Wait for Parner");
	room.partner = res;
    }
});

app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});
