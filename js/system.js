Array.prototype.shuffle = function() {
	var s = [];
	while (this.length) s.push(this.splice(Math.random() * this.length, 1)[0]);
	while (s.length) this.push(s.pop());
	return this;
}

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

Tournament.prototype.table = function() {
	this.players.shuffle();
	var html = '';
	for (var i = 0; i < this.players.length; i+=2) {
		html +='<tr><td width="220">'+this.players[i]._name+' ('+this.players[i].team+')</td><td width="20">-</td><td width="20">X</td><td width="20">-</td><td width="220">'+this.players[i+1]._name+' ('+this.players[i+1].team+')</td></tr>';	
	}
	document.getElementById('table-games').innerHTML = html;
}

