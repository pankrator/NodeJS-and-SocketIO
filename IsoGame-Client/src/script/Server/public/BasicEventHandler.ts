///<reference path="/../Definitions/socket.io.d.ts" />

module MainModule {

	export class BasicEventHandler {

		public socket: SocketIO.Socket;
		public world: World;

		constructor(socket: any, world: World) {
			this.socket = socket;
			this.world = world;
			
			this.socket.on("connected", this.onConnected);
			this.socket.on("newPlayerConnected", this.onPlayerConnected);
			this.socket.on("handleAllPlayers", this.handleAllPlayers);
			this.socket.on("playerDisconnect", this.handlePlayerDisconnect);
		}

		private onPlayerConnected = (data: any): void => {
			var player = new Player(data.data.name, data.data.x, data.data.y, data.data.sizeX);
			NetworkObjectCreator.create(player, this.socket, NetworkUpdateContext.PLAYER, data.id);
							
			this.world.remotePlayers[data.id] = player;
			console.log("Server: Hey! New player has just connected his name is " + data.data.name);
		}

		private onConnected = (data: any[]): void => {
			this.socket.emit("getAllPlayers");
//			console.log(this.socket);
			
			this.world.player = new Player("Ime", 30, 30, 30);
			NetworkObjectCreator.create(this.world.player, this.socket, NetworkUpdateContext.PLAYER, this.socket.io.engine.id).update();
			
			this.socket.emit("newPlayerConnected", {id: this.socket.io.engine.id, data: this.world.player});

			console.info("You are successfully connected");

			//TODO: Start the main app somewhere else
			App.start();
		}

		private handleAllPlayers = (allPlayers: any): void => {
			for(var id in allPlayers) {
				var p = new Player(null, null, null, 30);
				for(var i = 0 ; i < allPlayers[id].length; i++) {
					p[allPlayers[id][i].name] = allPlayers[id][i].value;
				}
				NetworkObjectCreator.create(p, this.socket, NetworkUpdateContext.PLAYER, id);
				this.world.remotePlayers[id] = p;
			}
		}
        
        private handlePlayerDisconnect = (id): void => {
            delete this.world.remotePlayers[id];
            console.log("Player " + id + " has just disconnected");
        }

//		public handleRemovePlayer(data: Player): void {
//			var ind = this.world.findPlayer(data.uniqueSocket);
//			
//			this.world.remotePlayers.splice(ind, 1);
//			console.log("Player with name " + data.name + " has just disconnected");
//		}
	}
}

//var BasicEventHandler = function(socket, world) {
//	this.socket = socket;
//	this.world = world;
//	
//	this.socket.on("connected", helper.hitch(this, this._onConnected));
//	this.socket.on("newPlayerConnected", helper.hitch(this, this._onPlayerConnected));
//	this.socket.on("handleAllPlayers", helper.hitch(this, this._handleAllPlayers));
//	this.socket.on("removePlayer", helper.hitch(this, this._handleRemovePlayer));
//}
//
//
//
//BasicEventHandler.prototype._handleRemovePlayer = function(data) {
//	//WARNING: May be this works ?!
//	var ind = this.world.findPlayer(data.uniqueSocket);
//	
//	this.world.remotePlayers.splice(ind,1);
//	console.log("Player with name " + data.name + " has just disconnected");
//}