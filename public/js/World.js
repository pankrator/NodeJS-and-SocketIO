var World = function() {

	this.remotePlayers = [];
	this.entities = [];
	this.player = null;
	
	this.map = {
		walls: []
	};
	
	this.update = function() {
		this.player.update();
		for(var i = 0; i < this.entities.length; i++) {
			this.entity[i].update();
		}
	}
	
	this.findPlayer = function(id) {
		for(var i = 0; i < this.remotePlayers.length; i++) {
			if(this.remotePlayers[i].uniqueSocket == id) {
				return i;
			}
		}
	}
}