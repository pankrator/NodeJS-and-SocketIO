var BasicEventHandler = function(socket, world) {
	this.socket = socket;
	this.world = world;
	
	this.socket.on("connected", helper.hitch(this, this._onConnected));
	this.socket.on("newPlayerConnected", helper.hitch(this, this._onPlayerConnected));
	this.socket.on("handleAllPlayers", helper.hitch(this, this._handleAllPlayers));
	this.socket.on("removePlayer", helper.hitch(this, this._handleRemovePlayer));
}

BasicEventHandler.prototype._onConnected = function(data) {
	this.socket.emit("getAllPlayers");

	this.world.player = new Player(this.socket.socket.sessionid, "ime", 30, 30, 30);
	this.socket.emit("newPlayerConnected", this.world.player);
	
	console.info("You are successfully connected");
	
	//TODO: Start the main app somewhere else
	App.start();
}


BasicEventHandler.prototype._handleAllPlayers = function(/* Array */allPlayers) {
	this.world.remotePlayers = [];
	for(var i = 0; i < allPlayers.length; i++) {
		var player = new Player(allPlayers[i].uniqueSocket, allPlayers[i].name, allPlayers[i].x, allPlayers[i].y);
		player.construct(allPlayers[i]);
		this.world.remotePlayers.push(player);
	}
}

BasicEventHandler.prototype._onPlayerConnected = function(data) {
	var player = new Player(data.uniqueSocket, data.name, data.x, data.y);
	player.construct(data);
	this.world.remotePlayers.push(player);
	console.log("Server: Hey! New player has just connected his name is " + data.name);
}


BasicEventHandler.prototype._handleRemovePlayer = function(data) {
	//WARNING: May be this works ?!
	var ind = this.world.findPlayer(data.uniqueSocket);
	
	this.world.remotePlayers.splice(ind,1);
	console.log("Player with name " + data.name + " has just disconnected");
}