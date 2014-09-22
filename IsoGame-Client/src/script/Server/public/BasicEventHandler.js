///<reference path="/../Definitions/socket.io.d.ts" />
var MainModule;
(function (MainModule) {
    var BasicEventHandler = (function () {
        function BasicEventHandler(socket, world) {
            var _this = this;
            this.onPlayerConnected = function (data) {
                var player = new MainModule.Player(data.data.name, data.data.x, data.data.y, data.data.sizeX);
                MainModule.NetworkObjectCreator.create(player, _this.socket, 0 /* PLAYER */, data.id);

                _this.world.remotePlayers[data.id] = player;
                console.log("Server: Hey! New player has just connected his name is " + data.data.name);
            };
            this.onConnected = function (data) {
                _this.socket.emit("getAllPlayers");

                //			console.log(this.socket);
                _this.world.player = new MainModule.Player("Ime", 30, 30, 30);
                MainModule.NetworkObjectCreator.create(_this.world.player, _this.socket, 0 /* PLAYER */, _this.socket.io.engine.id).update();

                _this.socket.emit("newPlayerConnected", { id: _this.socket.io.engine.id, data: _this.world.player });

                console.info("You are successfully connected");

                //TODO: Start the main app somewhere else
                MainModule.App.start();
            };
            this.handleAllPlayers = function (allPlayers) {
                for (var id in allPlayers) {
                    var p = new MainModule.Player(null, null, null, 30);
                    for (var i = 0; i < allPlayers[id].length; i++) {
                        p[allPlayers[id][i].name] = allPlayers[id][i].value;
                    }
                    MainModule.NetworkObjectCreator.create(p, _this.socket, 0 /* PLAYER */, id);
                    _this.world.remotePlayers[id] = p;
                }
            };
            this.handlePlayerDisconnect = function (id) {
                delete _this.world.remotePlayers[id];
                console.log("Player " + id + " has just disconnected");
            };
            this.socket = socket;
            this.world = world;

            this.socket.on("connected", this.onConnected);
            this.socket.on("newPlayerConnected", this.onPlayerConnected);
            this.socket.on("handleAllPlayers", this.handleAllPlayers);
            this.socket.on("playerDisconnect", this.handlePlayerDisconnect);
        }
        return BasicEventHandler;
    })();
    MainModule.BasicEventHandler = BasicEventHandler;
})(MainModule || (MainModule = {}));
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
