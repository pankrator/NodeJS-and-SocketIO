var canvas = document.getElementById("physics");
var ctx = canvas.getContext("2d");

/* class Vector */

var Vector = function(x, y) {
	this.x = x;
	this.y = y;	
}

Vector.prototype.add = function(v) {
	this.x+=v.x;
	this.y+=v.y;
}

Vector.prototype.mult = function(s) {
	this.x*=s;
	this.y*=s;
}

Vector.prototype.get = function() {
	return new Vector(this.x, this.y);
}

Vector.prototype.normalize = function() {
	//console.log(this.len());
	this.x /= this.len();
	this.y /= this.len();
}

Vector.prototype.len = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

/* class Circle */

var Circle = function(position) {
	this.position = position;
	this.velocity = new Vector(0, 0);
	this.acceleration = new Vector(0, 0);
}

Circle.prototype.setSpeed = function(vSpeed) {
	this.velocity = vSpeed;
}

Circle.prototype.update = function() {
	//this.velocity.add(this.acceleration);
	this.applyForce(gravity);
	this.applyForce(leftForce);
	this.setSpeed(this.acceleration);
	this.position.add(this.velocity);
	this.acceleration.mult(0);
}

Circle.prototype.applyForce = function(force) {
	this.acceleration.add(force);
}

var Liquid = function(x, y, width, height, c) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.c = c;
}

Liquid.prototype.draw = function() {
	ctx.fillStyle = "blue";
	ctx.beginPath();
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

/* Initialization */

var gravity = new Vector(0, 1.2);
var leftForce = new Vector(1, 0);

liquid = new Liquid(200, 200, 300, 300);
circle = new Circle(new Vector(250, 250));

var i = 0;
/* Main logic */

var update = function() {
	/*
	if(i > 0) {
		var friction = circle.velocity.get();
		friction.mult(-1);
		friction.normalize();
		friction.mult(1);
		circle.applyForce(friction);
	}
	*/
	i = 1;
	circle.update();
	setTimeout(update, 10);
}

var draw = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	liquid.draw();
	ctx.beginPath();
	ctx.arc(circle.position.x, circle.position.y, 20, 0, Math.PI*2);
	ctx.stroke();
	setTimeout(draw, 5);
}


window.onload = function() {
	update();
	draw();
}