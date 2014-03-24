var io, appSocket;

var idClientIncremental = 0;
var roomIdIncremental = 0;
var players = [];
var asd;

/**
*/
exports.initialize = function(serverIO, socket) {
    io = serverIO;
    appSocket = socket;
    idClientIncremental++;
    appSocket.emit('connected', {id: idClientIncremental, message: "You are connected !" });
	
	appSocket.on('hostCreateNewRoom', hostCreateNewRoom);
	appSocket.on('newPlayerConnected', newPlayerConnected);
	appSocket.on('getAllPlayers', handleGetAllPlayers);
	appSocket.on('disconnect', handleDisconnect);
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


// HELPER FUNCTIONS
function findPlayer(id) {
	for(var i = 0; i < players.length; i++) {
		if(players[i].uniqueSocket == id) {
			return players[i];
		}
	}
}