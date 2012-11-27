var currentTournament = new Tournament();

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
	input.setAttribute('class', 'newPlayer');
	input.setAttribute('placeholder', "Player's name");
	container.appendChild(input);
	input.focus();
}

function removeInputPlayer () {
	var container = document.getElementById('form'),
	inputs = document.getElementsByClassName('newPlayer');
	if(inputs.length > 2) {
		container.removeChild(inputs[inputs.length-1]);
	}
}

function addPlayers () {
	var inputs = document.getElementsByClassName('newPlayer');
	for (var i = 0; i < inputs.length; i++) {
		currentTournament.players[i] = new Player(inputs[i].value);
	}
	hide(document.getElementById('step1'));
	step2();
}

function step2 () {
	var html = '';
	for (var i = 0; i < currentTournament.players.length; i++) {
		html += '<tr><td width="200">'+currentTournament.players[i]._name+'</td><td width="200"><input class="input-team" type="text" name-player="'+currentTournament.players[i]._name+'"></td></tr> ';
	}
	document.getElementById('content-table-set-team').innerHTML = html;
	show(document.getElementById('step2'));
}

function addTeams () {
	var inputs = document.getElementsByClassName('input-team'),
	i = inputs.length-1;
	while(i>=0){
		for (var j = 0; j < inputs.length; j++) {
			if (currentTournament.players[i]._name === inputs[j].getAttributeNode("name-player").value) {
				currentTournament.players[i].team = inputs[j].value;
			}
		}
		i--;
	}
}

















