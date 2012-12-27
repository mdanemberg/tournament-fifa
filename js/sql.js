function TournamentDb () {
	this.players = [];
	this.db = openDatabase('Tournament', '1.0', 'Tournament database', 2 * 1024 * 1024);
	this.db.transaction(function (tx) {
  		tx.executeSql('CREATE TABLE IF NOT EXISTS players (id unique, name, team, gols, points)');
  		tx.executeSql('CREATE TABLE IF NOT EXISTS games (id unique, player1, player2)');
	});
}

TournamentDb.prototype.addPlayer = function(id, name, team, gols, points) {
	this.db.transaction(function (tx) {
  		tx.executeSql('INSERT INTO players (id, name, team, gols, points) VALUES ('+id+', "'+name+'", "'+team+'" ,'+gols+', '+points+')');
	});
};

TournamentDb.prototype.addGames = function(id, player1, player2) {
	this.db.transaction(function (tx) {
		tx.executeSql('INSERT INTO games (id, player1, player2) VALUES ('+id+', "'+idPlayer1+'", "'+idPlayer2+'")');
	});
};

TournamentDb.prototype.getPlayers = function() {
	var _self = this;
	this.db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM players', [], function (tx, results) {
  			var len = results.rows.length, i;
  			for (i = 0; i < len; i++) {
  				// players[i] = 	results.rows.item(i).id+','
  				// 			   +results.rows.item(i).name+','
  				// 			   +results.rows.item(i).team+','
  				// 			   +results.rows.item(i).gols+','
  				// 			   +results.rows.item(i).points;
  				_self.players[i] = results.rows.item(i).team;
  				var nome = results.rows.item(i).name;
  				alert(','+nome);
  			}
		});
	});
	return _self.players;
};

var torDb = new TournamentDb();