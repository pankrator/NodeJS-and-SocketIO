var InputManager = function() {
	
	this.keys = [];
	this.mouseX = 0;
	this.mouseY = 0;
	
	window.addEventListener("keydown", helper.hitch(this, this._handleKeyDown), false);
	window.addEventListener("keyup", helper.hitch(this, this._handleKeyUp), false);
	App.canvas.addEventListener("mousemove", helper.hitch(this, this._handleMouseMove), false);
}

InputManager.prototype._handleKeyDown = function(key) {
	this.keys[parseInt(key.keyCode)] = true;
}

InputManager.prototype._handleKeyUp = function(key) {
	this.keys[parseInt(key.keyCode)] = false;
}

InputManager.prototype._handleMouseMove = function(ev) {
		this.bounds = App.canvas.getBoundingClientRect();
		this.mouseX = ev.clientX - this.bounds.left;
		this.mouseY = ev.clientY - this.bounds.top;
}