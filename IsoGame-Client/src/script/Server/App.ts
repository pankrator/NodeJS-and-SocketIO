var helper = require("./util").helper;
import wl = require("./World");
import wHandler = require("./WorldEventHandler");

var BasicEventHandler = require("./BasicEventHandler").BasicEventHandler;

var world = new wl.World();

var io, appSocket;

//var world = new World();

/**
*/
exports.initialize = function(serverIO, socket) {
    io = serverIO;
    appSocket = socket;
	
	var worldEventHandler = new wHandler.WorldEventHandler(appSocket, world);
	var basicEventHandler = new BasicEventHandler(appSocket, world);
	
	/** Basic game events **/
    appSocket.emit('connected', { message: "You are connected !" });
	//appSocket.on('disconnect', handleDisconnect);
	//appSocket.on('newPlayerConnected', newPlayerConnected);
	//appSocket.on('getAllPlayers', handleGetAllPlayers);
	
}