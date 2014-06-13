var Player = Entity.extend(
{

	init: function(sessionId, name, x, y, size) {

		this.parent(x, y, size);
	
		/**
			This is the socketId by witch the players are identified
		**/
		this.uniqueSocket = sessionId;
		
		this.name =  name;
		
		this.invisible = false;
	},
	
	draw: function(context) {
		if(!this.invisible || this.uniqueSocket == App.socket.socket.sessionid) {
			context.beginPath();
			context.rect(this.x, this.y, this.sizeX, this.sizeY);
			//TODO: Render bounding box if in debug mode
			context.stroke();
		}
	},
	
	move: function() {
		if(App.inputManager.keys[KEYS.SPACE] && !this.invisible) {
			this.invisible = true;
			App.socket.emit("playerUpdate", this);
		}
		if (!App.inputManager.keys[KEYS.SPACE] && this.invisible) {
			this.invisible = false;
			App.socket.emit("playerUpdate", this);
		}
	//TODO: Add namespace KEY which holds all key codes
		if(App.inputManager.keys[KEYS.LEFT_ARROW]) {
			this.x -= 2;
			App.socket.emit("playerMove", {x: this.x, y: this.y, uniqueSocket: this.uniqueSocket});
		}
		if(App.inputManager.keys[KEYS.UP_ARROW]) {
			this.y -= 2;
			App.socket.emit("playerMove", {x: this.x, y: this.y, uniqueSocket: this.uniqueSocket});
		}
		if(App.inputManager.keys[KEYS.RIGHT_ARROW]) {
			this.x += 2;
			App.socket.emit("playerMove", {x: this.x, y: this.y, uniqueSocket: this.uniqueSocket});
		}
		if(App.inputManager.keys[KEYS.DOWN_ARROW]) {
			this.y += 2;
			App.socket.emit("playerMove", {x: this.x, y: this.y, uniqueSocket: this.uniqueSocket});
		}
	}

});