var util = require("util");

var express = require("express");

var appLogic = require('./App');
	
var app = express();
app.use(express.static(__dirname + "/public"));

var server = require('http').createServer(app).listen(8000);

var io = require("socket.io").listen(server);

io.sockets.on('connection', function(socket) {
	appLogic.initialize(io, socket);
});