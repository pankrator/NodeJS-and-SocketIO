var WorldEventHandler = function (socket, world) {
    this.socket = socket;
    this.world = world;

    this.socket.on("updateEntities", helper.hitch(this, this._updateEnemies));
    this.socket.on("playerMove", helper.hitch(this, this._handlePlayerMove));
    this.socket.on("playerUpdate", helper.hitch(this, this._handlePlayerUpdate));
    this.socket.on("updateMap", helper.hitch(this, this._handleUpdateMap));

    this.socket.emit("requestMap");
};

WorldEventHandler.prototype._updateEnemies = function (data) {
    this.world.entities = data.entities;
};

/**
data: {
@see class Player
}
*/
WorldEventHandler.prototype._handlePlayerMove = function (data) {
    if (data.uniqueSocket == this.world.player.uniqueSocket) {
        this.world.player.x = data.x;
        this.world.player.y = data.y;
    } else {
        var ind = this.world.findPlayer(data.uniqueSocket);

        this.world.remotePlayers[ind].x = data.x;
        this.world.remotePlayers[ind].y = data.y;
    }
};

WorldEventHandler.prototype._handlePlayerUpdate = function (data) {
    if (data.uniqueSocket == this.world.player.uniqueSocket) {
        //TODO: Update current player
    } else {
        var ind = this.world.findPlayer(data.uniqueSocket);

        this.world.remotePlayers[ind].construct(data);
    }
};

WorldEventHandler.prototype._handleUpdateMap = function (map) {
    this.world.map.walls = [];
    for (var i = 0; i < map.walls.length; i++) {
        var wall = new Wall(map.walls[i].x, map.walls[i].y, map.walls[i].size);
        this.world.map.walls.push(wall);
    }
};
