function TournamentDb () {
	this.players = [];
	this.db = openDatabase('Tournament', '1.0', 'Tournament database', 2 * 1024 * 1024);
	this.db.transaction(function (tx){
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

TournamentDb.prototype.getPlayers = function(callback) {
	var _self = this;
	this.db.transaction(function (tx) {

		tx.executeSql('SELECT * FROM players', [], function (tx, results){

  			var len = results.rows.length, i;
  			for (i = 0; i < len; i++) {
  				_self.players[i] = 	new Player(results.rows.item(i).name);
  				_self.players[i]._id = results.rows.item(i).id;
  				_self.players[i].team = results.rows.item(i).team;
  				_self.players[i].gols = results.rows.item(i).gols;
  				_self.players[i].gols = results.rows.item(i).points;
  			}
			callback(_self.players);
		});
	});
};