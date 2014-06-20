var Camera = function() {
	
	this.x = 0;
	this.y = 0;
	this.canvasWidth = 900;
	this.canvasHeight = 900;
	
	this.follow = function(target) {
		this.x = -target.x + this.canvasWidth / 2;
		this.y = -target.y + this.canvasHeight / 2;
	}
}