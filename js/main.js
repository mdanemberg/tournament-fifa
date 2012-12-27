var currentTournament = new Tournament();
currentTournament.getPlayers();

function hide (el) {
	el.style.display="none";
}

function show (el) {
	el.style.display="block";
}

function hasClass (el, cls) {
	var classes = el.className.split(" "),
	equal = '';
	for (var i = 0; i < classes.length; i++) {
		if(classes[i] === cls){
			equal = classes[i];
			return true;
		}
	}
	return false;
}

function addInputPlayer () {
	var container = document.getElementById('form');
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('class', 'new-player');
	input.setAttribute('placeholder', "Player's name");
	container.appendChild(input);
	input.focus();
}

function removeInputPlayer () {
	var container = document.getElementById('form'),
	inputs = document.getElementsByClassName('new-player');
	if(inputs.length > 2) {
		container.removeChild(inputs[inputs.length-1]);
	}
}

function step2 () {
	var html = '';
	for (var i = 0; i < currentTournament.players.length; i++) {
		if(currentTournament.players[i]._name !== 'bot') {
			html += '<tr><td width="200">'+currentTournament.players[i]._name+'</td><td width="200"><input class="input-team" type="text" name-player="'+currentTournament.players[i]._name+'"></td></tr> ';
		}
	}
	document.getElementById('content-table-set-team').innerHTML = html;
	show(document.getElementById('step2'));
}

var btnRank = document.getElementsByClassName('btn-rank');
var btnTable = document.getElementsByClassName('btn-table');

btnRank[0].onclick = function() {
	btnRank[0].parentElement.className = 'active';
	btnTable[0].parentElement.className = '';
	currentTournament.getRank('content-rank');
	hide(document.getElementById('table-games'));
	show(document.getElementById('table-rank'));
};

btnTable[0].onclick = function() {
	btnTable[0].parentElement.className = 'active';
	btnRank[0].parentElement.className = '';
	show(document.getElementById('table-games'));
	hide(document.getElementById('table-rank'));
};

document.getElementById('add-players').onclick = function() {
	currentTournament.addPlayers('new-player');
};

document.getElementById('add-teams').onclick = function() {
	currentTournament.addTeams('input-team');
};