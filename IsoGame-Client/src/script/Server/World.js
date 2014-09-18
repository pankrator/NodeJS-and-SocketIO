var World = (function () {
    function World() {
        this.players = new Object();
        this.entities = new Object();
    }
    return World;
})();
exports.World = World;
//export = World;
//var Wall = require("./Obstacle").Wall;
//var World = function() {
//
//	this.players = [];
//	this.entities = [];
//
//	this.map = new Map();
//
//	this.findPlayer = function(id) {
//		for(var i = 0; i < this.players.length; i++) {
//			if(this.players[i].uniqueSocket == id) {
//				return i;
//			}
//		}
//	}
//}
//
//var Map = function() {
//
//	this.walls = [];
//
//	for(var i = 0; i < 100; i++) {
//		var wall = new Wall(Math.random() * 500, Math.random() * 500, 30);
//		this.walls.push(wall);
//	}
//}
//module.exports.World = World;
