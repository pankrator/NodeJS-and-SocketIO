var BasicEventHandler = (function () {
    function BasicEventHandler(socket, world) {
        var _this = this;
        this.newPlayerConnected = function (data) {
            _this.world.players[data.id] = data.data;
            _this.socket.broadcast.emit("newPlayerConnected", data);
        };
        this.handleGetAllPlayers = function () {
            _this.socket.emit("handleAllPlayers", _this.world.players);
        };
        this.handleDisconnect = function () {
            console.log("player disconnected " + _this.socket.id);
            delete _this.world.players[_this.socket.id];

            _this.socket.broadcast.emit("playerDisconnect", _this.socket.id);
        };
        this.socket = socket;
        this.world = world;

        this.socket.on("disconnect", this.handleDisconnect);
        this.socket.on('newPlayerConnected', this.newPlayerConnected);
        this.socket.on('getAllPlayers', this.handleGetAllPlayers);
    }
    return BasicEventHandler;
})();
exports.BasicEventHandler = BasicEventHandler;
//var helper = require("./util").helper;
//
//var BasicEventHandler = function(socket, world) {
//	this.socket = socket;
//	this.world = world;
//
//	this.socket.on('disconnect', helper.hitch(this, this.handleDisconnect));
//	this.socket.on('newPlayerConnected', helper.hitch(this, this.newPlayerConnected));
//	this.socket.on('getAllPlayers', helper.hitch(this, this.handleGetAllPlayers));
//}
//
//BasicEventHandler.prototype.newPlayerConnected = function(data) {
//	this.world.players.push(data);
//	this.socket.broadcast.emit("newPlayerConnected", data);
//}
//
//BasicEventHandler.prototype.handleDisconnect = function (data) {
//	var ind = this.world.findPlayer(this.socket.id);
//	var player = this.world.players[ind];
//	this.world.players.splice(ind,1);
//
//	this.socket.broadcast.emit("removePlayer", player);
//}
//
//BasicEventHandler.prototype.handleGetAllPlayers = function () {
//	console.log("length:", this.world.players.length);
//	this.socket.emit("handleAllPlayers", this.world.players);
//}
//
//module.exports.BasicEventHandler = BasicEventHandler;
