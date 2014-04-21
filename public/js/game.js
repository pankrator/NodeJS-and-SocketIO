var Wall = function(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
};

Wall.prototype.copy = function(other) {
	this.x = other.x;
	this.y = other.y;
	this.width = other.width;
	this.height = other.height;
	this.color = other.color;
}

Wall.prototype.isInside = function(x, y) {
	if(x >= this.x && x <= this.x + this.width &&
		y >= this.y && y <= this.y + this.height) {
		return true;
	}
	return false;
}

Wall.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	ctx.fill();
}