var helper = require("./util").helper;

var WorldEventHandler = function(socket, world) {
	this.socket = socket;
	this.world = world;
	
	this.socket.on("playerMove", helper.hitch(this, this.handlePlayerMove));
	this.socket.on("playerUpdate", helper.hitch(this, this.handlePlayerUpdate));
	this.socket.on("requestMap", helper.hitch(this, this.requestMap));
}


/*
	data: {
		x: this.x,
		y: this.y,
		id: this.uniqueSocket
	};
*/
WorldEventHandler.prototype.handlePlayerMove = function(data) {
	var ind = this.world.findPlayer(data.uniqueSocket);
	
	if(Math.abs(this.world.players[ind].x - data.x) < 8) {
		//User is trying to cheat: prevent this	
		this.world.players[ind].x = data.x;
		this.world.players[ind].y = data.y;

		this.socket.broadcast.emit("playerMove", this.world.players[ind]);
	} else {
		//TODO: Return player to the real coordinates if cheated
		this.socket.emit("playerMove", this.world.players[ind]);
	}

}

WorldEventHandler.prototype.handlePlayerUpdate = function(data) {
	this.socket.broadcast.emit("playerUpdate", data);
}

WorldEventHandler.prototype.requestMap = function(data) {
	this.socket.emit("updateMap", this.world.map);
}

module.exports.WorldEventHandler = WorldEventHandler