/*
 * Player's Class
*/

function Player(name) {
	this._name = name;
	this._id = 0;
	this.team = 'undefined';
	this.points = 0;
	this.gols = 0;
}

/*
 * Game's Class
*/

function Game(player1, player2) {
	this.p1 = player1;
	this.p2 = player2;
	this.resulP1 = null;
	this.resulP2 = null;
}

// Logic tournament
function Tournament () {
	this.players = [];
	this.rank = [];
	this.torDb = new TournamentDb();
	this.games = [];
}

Tournament.prototype.getPlayers = function() {
	var _self = this;
	this.torDb.getPlayers(function(players) {
		_self.players = players;
	});
};

Tournament.prototype.setGames = function() {
	this.players.shuffle();
	var numPlayers = this.players.length;
	for (var i = 0; i < numPlayers; i++) {
		for (var j = 0; j < numPlayers; j++) {
			// todos contra todos ida e volta --> if(i!==j)
			// todos contra todos só ida --> if(i<j)
			if(i<j) {
				this.games.push(players[i],players[j]);
			}
		}
	}
	for (var k = 0; k < tableGames.length; k++) {
		html += tableGames[k];
	}
	document.getElementById('table-games').innerHTML = html;
};

Tournament.prototype.table = function() {
	this.players.shuffle();
	var tableGames = [], numPlayers = this.players.length, html = '';
	for (var i = 0; i < numPlayers; i++) {
		for (var j = 0; j < numPlayers; j++) {
			// todos contra todos ida e volta --> if(i!==j)
			// todos contra todos só ida --> if(i<j)
			if(i<j) {
				tableGames.push('<tr><td width="200">'+this.players[i]._name+' ('+this.players[i].team+')</td><td width="20">-</td><td width="20">X</td><td width="20">-</td><td width="200">'+this.players[j]._name+' ('+this.players[j].team+')</td><td width="40"><a href="javascript:;" class="btn-play-game" name-player-1="'+this.players[i]._name+'" name-player-2="'+this.players[j]._name+'" onclick="currentTournament.playGame(this);">jogar</a></td></tr>');
			}
		}
	}
	for (var k = 0; k < tableGames.length; k++) {
		html += tableGames[k];
	}
	document.getElementById('table-games').innerHTML = html;
};

Tournament.prototype.getRank = function(containerRank) {
	var html = '';
	this.rank = this.players.slice();
	for (var j = 0; j < this.players.length; j++) {
		for (var i = j+1; i < this.players.length; i++) {
			if (this.rank[j].points < this.rank[i].points) {
				var temp = this.rank[j];
				this.rank[j] = this.rank[i];
				this.rank[i] = temp;
			}
		}
	}
	for (var k = 0; k < this.rank.length; k++) {
		if(this.rank[k]._name !== 'bot') {
			html +='<tr><td width="450" class="column-name">'+this.rank[k]._name+' ('+this.rank[k].team+')</td><td width="50">'+this.rank[k].points+'</td>';
		}
	}
	document.getElementById(containerRank).innerHTML = html;
};

Tournament.prototype.addTeams = function(inputClass, callback) {
	var inputs = document.getElementsByClassName(inputClass),
			i = inputs.length-1;
	while(i>=0){
		for (var j = 0; j < inputs.length; j++) {
			if (this.players[i]._name === inputs[j].getAttributeNode("name-player").value) {
				this.players[i].team = inputs[j].value;
			}
		}
		i--;
	}
	for (var k = 0; k > this.players.length; k++) {
		var p = this.players;
		this.torDb.addPlayers(p[k]._id,p[k]._name,p[k].team,p[k].gols,p[k].points);	
	}
	callback();
};

Tournament.prototype.addName = function(inputClass, callback) {
	var inputs = document.getElementsByClassName(inputClass);
	for (var i = 0; i < inputs.length; i++) {
		if(inputs[i].value !== '') {
			this.players.push(new Player(inputs[i].value));
		}
	}
	if(this.players.length % 2 !== 0) {
		var bot = new Player('bot');
		bot.team = 'bot';
		this.players.push(bot);
	}
	callback();
};

Tournament.prototype.playGame = function(ev) {
	var player1 = ev.getAttributeNode("name-player-1").value,
		player2 = ev.getAttributeNode("name-player-2").value;

	this.newGame(player1, player2);
};

Tournament.prototype.addPlayers = function(first_argument) {
	// body...
};








