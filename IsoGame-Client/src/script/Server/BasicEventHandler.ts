import worldM = require("./World");export class BasicEventHandler {		public socket: SocketIO.Socket;	public world: worldM.World;		constructor(socket: SocketIO.Socket, world: worldM.World) {		this.socket = socket;		this.world = world;				this.socket.on("disconnect", this.handleDisconnect);		this.socket.on('newPlayerConnected', this.newPlayerConnected);		this.socket.on('getAllPlayers', this.handleGetAllPlayers);	}		private newPlayerConnected = (data: any): void => {		this.world.players[data.id] = data.data;		this.socket.broadcast.emit("newPlayerConnected", data);	}		private handleGetAllPlayers = (): void => {		this.socket.emit("handleAllPlayers", this.world.players);	}			private handleDisconnect = (): void => {        console.log("player disconnected " + this.socket.id);        delete this.world.players[this.socket.id];                this.socket.broadcast.emit("playerDisconnect", this.socket.id);	}}//var helper = require("./util").helper;////var BasicEventHandler = function(socket, world) {//	this.socket = socket;//	this.world = world;//	//	this.socket.on('disconnect', helper.hitch(this, this.handleDisconnect));//	this.socket.on('newPlayerConnected', helper.hitch(this, this.newPlayerConnected));//	this.socket.on('getAllPlayers', helper.hitch(this, this.handleGetAllPlayers));//}////BasicEventHandler.prototype.newPlayerConnected = function(data) {//	this.world.players.push(data);//	this.socket.broadcast.emit("newPlayerConnected", data);//}////BasicEventHandler.prototype.handleDisconnect = function (data) {//	var ind = this.world.findPlayer(this.socket.id);//	var player = this.world.players[ind];//	this.world.players.splice(ind,1);//	//	this.socket.broadcast.emit("removePlayer", player);//}////BasicEventHandler.prototype.handleGetAllPlayers = function () {//	console.log("length:", this.world.players.length);//	this.socket.emit("handleAllPlayers", this.world.players);//}////module.exports.BasicEventHandler = BasicEventHandler;