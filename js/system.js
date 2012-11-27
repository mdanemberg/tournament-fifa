// Player's Class
function Player (name) {
	this._name = name;
	this.team = 'undefined';
	this.points = 0;
}

// Logic tournament
function Tournament () {
	this.players = [];
}

Tournament.prototype.newGame = function(player1, player2) {
	var game = ['player1', 'player2'];
	for (var i = players.length - 1; i >= 0; i--) {
		if (players[i]._name === player1) {
			game['player1'] = players[i];
		}else if (players[i]._name === player2) {
			game['player2'] = players[i];
		}
	}
};