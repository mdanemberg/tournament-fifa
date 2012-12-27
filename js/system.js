Array.prototype.shuffle = function() {
	var s = [];
	while (this.length) s.push(this.splice(Math.random() * this.length, 1)[0]);
	while (s.length) this.push(s.pop());
	return this;
};
// Player's Class
function Player (name) {
	this._name = name;
	this._id = 0;
	this.team = 'undefined';
	this.points = 0;
	this.gols = 0;
}

// Logic tournament
function Tournament () {
	this.players = [];
	this.rank = [];
	this.torDb = new TournamentDb();
}

Tournament.prototype.newGame = function(player1, player2) {
	var game = ['player1', 'player2'],
		html = '';
	for (var i = this.players.length - 1; i >= 0; i--) {
		if (this.players[i]._name === player1) {
			game['player1'] = this.players[i];
		}else if (this.players[i]._name === player2) {
			game['player2'] = this.players[i];
		}
	}
	return game;
};

Tournament.prototype.getPlayers = function() {
	var self = this;
	this.torDb.getPlayers(function(players) {
		self.players = players;
	});
};

Tournament.prototype.table = function() {
	this.players.shuffle();
	var games = [], numPlayers = this.players.length, html = '';
		for (var i = 0; i < numPlayers; i++) {
			for (var j = 0; j < numPlayers; j++) {
				// todos contra todos ida e volta --> if(i!==j)
				// todos contra todos só ida --> if(i<j)
				if(i<j) {
					games.push('<tr><td width="200">'+this.players[i]._name+' ('+this.players[i].team+')</td><td width="20">-</td><td width="20">X</td><td width="20">-</td><td width="200">'+this.players[j]._name+' ('+this.players[j].team+')</td><td width="40"><a href="javascript:;" class="btn-play-game" name-player-1="'+this.players[i]._name+'" name-player-2="'+this.players[j]._name+'" onclick="currentTournament.playGame(this);">jogar</a></td></tr>');
				}
			}
		}
	// games.shuffle();
	for (var k = 0; k < games.length; k++) {
		html += games[k];
	}
	document.getElementById('table-games').innerHTML = html;
};

Tournament.prototype.getRank = function(containerRank) {
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
	var html = '';
	for (var k = 0; k < this.rank.length; k++) {
		if(this.rank[k]._name !== 'bot') {
			html +='<tr><td width="450" class="column-name">'+this.rank[k]._name+' ('+this.rank[k].team+')</td><td width="50">'+this.rank[k].points+'</td>';
		}
	}
	document.getElementById(containerRank).innerHTML = html;
};

Tournament.prototype.addTeams = function(inputClass) {
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
	hide(document.getElementById('step2'));
	this.table();
	show(document.getElementById('step3'));
};

Tournament.prototype.addPlayers = function(inputClass) {
	var inputs = document.getElementsByClassName(inputClass);
	for (var i = 0; i < inputs.length; i++) {
		if(inputs[i].value !== '') {
			this.players[i] = new Player(inputs[i].value);
		}
	}
	if(this.players.length % 2 !== 0) {
		var bot = new Player('bot');
		bot.team = 'bot';
		this.players.push(bot);
	}
	hide(document.getElementById('step1'));
	step2();
};

Tournament.prototype.playGame = function(ev) {
	var player1 = ev.getAttributeNode("name-player-1").value,
		player2 = ev.getAttributeNode("name-player-2").value;

	this.newGame(player1, player2);
};











