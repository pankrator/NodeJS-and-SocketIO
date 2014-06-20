var Renderer = function(context) {
	this.context = context;
	
}

Renderer.prototype.render = function() {
	
	this.context.clearRect(0,0, 800, 800);
	
	this.context.save();
	
	this.context.translate(App.camera.x, App.camera.y);
	
	App.tileMap.draw(this.context);
	
	App.world.player.draw(this.context);
	
	for(var i = 0; i < App.world.remotePlayers.length; i++) {
		App.world.remotePlayers[i].draw(this.context);
	}
	/*
	for(var i = 0; i < App.world.map.walls.length; i++) {
		App.world.map.walls[i].draw(this.context);
	}
	*/
	for(var i = 0; i < App.world.entities.length; i++) {
		App.world.entities[i].draw(this.context);
	}
	
	this.context.restore();	
}

