var Game = require('./game');

var io, appSocket;

var idClientIncremental = 0;
var roomIdIncremental = 0;
var players = [];
var walls = [];

/**
*/
exports.initialize = function(serverIO, socket) {
	var w = new Game.Wall(300, 200, 300,50, "blue");
	walls.push(w);
	
    io = serverIO;
    appSocket = socket;
	
	/** Basic game events **/
    appSocket.emit('connected', { message: "You are connected !" });
	appSocket.on('disconnect', handleDisconnect);
	appSocket.on('newPlayerConnected', newPlayerConnected);
	appSocket.on('getAllPlayers', handleGetAllPlayers);
	
	/** Game specific events **/
	appSocket.on('hostCreateNewRoom', hostCreateNewRoom);
	appSocket.on('stickerMove', handleStickerMove);
	
	/** Environment specific events **/
	appSocket.on('requestWalls', handleRequestWalls);
}

/**
 * This function is called when player hosts a room
 *
 * scope of "this" is socket
 */
function hostCreateNewRoom() {
	roomIdIncremental++;
	
	this.emit("newRoomCreated", { roomId: roomIdIncremental });
}

function handleRequestWalls() {
	this.emit("sendWalls", walls);
}

function handleDisconnect() {
	
	var player = findPlayer(this.id);
	var ind = players.indexOf(player);
	players.splice(ind,1);
	
	this.broadcast.emit("removePlayer", player);
}

function newPlayerConnected(data) {

	players.push(data);
	
	this.broadcast.emit("newPlayerConnected", data);
}

function handleGetAllPlayers() {
	this.emit("handleAllPlayers", players);
}

function handleStickerMove(data) {
	var player = findPlayer(data.uniqueSocket);
	player.sticker.x = data.x;
	player.sticker.y = data.y;
	this.broadcast.emit("stickerMove", data);
}


// HELPER FUNCTIONS
function findPlayer(id) {
	for(var i = 0; i < players.length; i++) {
		if(players[i].uniqueSocket == id) {
			return players[i];
		}
	}
}