var helper = require("./util").helper;

var WorldEventHandler = require("./WorldEventHandler").WorldEventHandler,
	BasicEventHandler = require("./BasicEventHandler").BasicEventHandler,
	World = new require("./World").World;

var io, appSocket;

var world = new World();

/**
*/
exports.initialize = function(serverIO, socket) {
    io = serverIO;
    appSocket = socket;
	
	var worldEventHandler = new WorldEventHandler(appSocket, world);
	var basicEventHandler = new BasicEventHandler(appSocket, world);
	
	/** Basic game events **/
    appSocket.emit('connected', { message: "You are connected !" });
	//appSocket.on('disconnect', handleDisconnect);
	//appSocket.on('newPlayerConnected', newPlayerConnected);
	//appSocket.on('getAllPlayers', handleGetAllPlayers);
	
	/** Game specific events **/
	appSocket.on('stickerMove', handleStickerMove);
}

function handleStickerMove(data) {
	var player = findPlayer(data.uniqueSocket);
	player.sticker.x = data.x;
	player.sticker.y = data.y;
	this.broadcast.emit("stickerMove", data);
}