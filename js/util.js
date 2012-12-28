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

Array.prototype.shuffle = function() {
	var s = [];
	while (this.length) s.push(this.splice(Math.random() * this.length, 1)[0]);
	while (s.length) this.push(s.pop());
	return this;
};
