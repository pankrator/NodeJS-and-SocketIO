var canvas = document.getElementById("physics");
var ctx = canvas.getContext("2d");

/* class Circle */

var Circle = function(position, mass) {
	this.mass = mass;
	this.position = position;
	this.velocity = new Vector(0, 0);
	this.acceleration = new Vector(0, 0);
}

Circle.prototype.setSpeed = function(vSpeed) {
	this.velocity.x = vSpeed.x;
	this.velocity.y = vSpeed.y;
}

Circle.prototype.update = function() {
	var grav = gravity.get();
	grav.mult(this.mass);
	this.applyForce(grav);
	this.applyForce(leftForce);
	this.velocity.add(this.acceleration);
	this.velocity.limit(6);
	this.position.add(this.velocity);
	this.acceleration.mult(0);
}

Circle.prototype.draw = function() {
	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.arc(this.position.x, this.position.y, this.mass * 2, 0, Math.PI * 2);
	ctx.fill();
}

Circle.prototype.applyForce = function(force) {
	this.acceleration.add(force);
}

/**
	Simulate dragging in surface
	
	surface: The surface you are going through
*/
Circle.prototype.drag = function(surface) {
	var speed = this.velocity.len();
	var dragMagnitude = surface.c * speed * speed;
	var drag = this.velocity.get(); // The drag vector
	drag.mult(-1);
	drag.normalize();
	drag.mult(dragMagnitude);
	this.applyForce(drag);
}

/* class Liquid */

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

var gravity = new Vector(0, 0.15);
var leftForce = new Vector(0, 0);

liquid = new Liquid(200, 200, 300, 300, 2);
circle = new Circle(new Vector(250, 0), 20);
circle2 = new Circle(new Vector(290, 0), 5);

/* Main logic */

var update = function() {
	if(circle.position.y >= 200 && circle.position.y <= 500) {
		//circle.drag(liquid);
		circle2.drag(liquid);
	}
	//circle.update();
	circle2.update();
	setTimeout(update, 10);
}

var draw = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	liquid.draw();
	//circle.draw();
	circle2.draw();
	setTimeout(draw, 5);
}


window.onload = function() {
	update();
	draw();
}