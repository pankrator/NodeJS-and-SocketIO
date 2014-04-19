var App = {
    
	remotePlayers: [],
	
	socket: null,
    
    init: function() {
		this.socket = io.connect("", {port: 8000, transports: ["websocket"]});
        this.bindEvents();
		Player.name = prompt("Type your player name");
		Game.init();
		Game.update();
		Player.update();
    },
    
    bindEvents: function() {
        this.socket.on("connected", this._onConnected);
        this.socket.on("newRoomCreated", this._onNewRoomCreated);
		this.socket.on("newPlayerConnected", this._onPlayerConnected);
		this.socket.on("handleAllPlayers", this._handleAllPlayers);
		this.socket.on("removePlayer", this._handleRemovePlayer);
    },
	
	_handleRemovePlayer: function(data) {
		console.log(data);
		var ind = App.findPlayer(data.uniqueSocket);
		App.remotePlayers.splice(ind,1);
	},
	
	findPlayer: function(id) {
		for(var i = 0; i < App.remotePlayers.length; i++) {
			if(App.remotePlayers[i].uniqueSocket == id) {
				return i
			}
		}
	},
    
    _onConnected: function(data) {
		this.emit("getAllPlayers");

		var newPlayer = {
			id:data.id,
			name: Player.name,
			uniqueSocket: this.socket.sessionid
		};
		
		this.emit("newPlayerConnected", newPlayer);
		App.remotePlayers.push(newPlayer);
		Player.create(newPlayer);
		
        console.log("Server: " + data.message + " Welcome player with id " + data.id);
    },
	
	_handleAllPlayers: function(/* Array */allPlayers) {
		App.remotePlayers = allPlayers;
	},
	
	_onPlayerConnected: function(data) {
		App.remotePlayers.push(data);
		console.log("Server: Hey! New player has just connected his name is " + data.name);
	},
	
	_onNewRoomCreated: function(data) {
		
	},
    
    __sayMyId: function() {
		console.log("id: " + App.uniqueId);
		var me = this;
		setTimeout(function() { me.sayMyId(); }, 1000);
    },
	
	createGame: function() {
		this.socket.emit("hostCreateNewRoom");
	}
};

var Player = {
	
	id: null,
	
	name: null,
	
	/**
		Something like copy constructor
		Populates all data of Player with other information from obj
	*/
	create: function(obj) {
		this.id = obj.id;
		this.name = obj.name;
	},
	
	update: function() {
		// if(Game.keys[String.fromCharCode(
		if(Game.mouse.lButton) {
			console.log("leeeft");
		}
		setTimeout(helper.hitch(this, this.update), 20);
	}
}

var Game = {
	
	/** Object containing states of the mouse
		{
			x: x coordinates,
			y: y coordinates,
			lButton: is left button down
			rButton: is right button down
		}
	**/
	mouse: {},
	keys: [],
	
	init: function() {
		window.addEventListener("keydown", helper.hitch(this, this._processKeyboardDown), false);
		window.addEventListener("keyup", helper.hitch(this, this._processKeyboardUp), false);
		window.addEventListener("mousemove", helper.hitch(this, this._processMouseMove), false);
		window.addEventListener("mousedown", helper.hitch(this, this._processMouseDown), false);
		window.addEventListener("mouseup", helper.hitch(this, this._processMouseUp), false);
	},
	
	_processMouseMove: function(ev) {
		this.mouse.x = ev.x;
		this.mouse.y = ev.y;
	},
	
	_processMouseDown: function(ev) {
		switch(ev.button) {
		case 0:
			this.mouse.lButton = true;
			break;
		case 2:
			this.mouse.rButton = true;
			break;
		}
	},
	
	_processMouseUp: function(ev) {
		switch(ev.button) {
		case 0:
			this.mouse.lButton = false;
			break;
		case 2:
			this.mouse.rButton = false;
			break;
		}
	},
	
	_processKeyboardDown: function(ev) {
		this.keys[parseInt(ev.keyCode)] = true;
	},
	
	_processKeyboardUp: function(ev) {
		this.keys[parseInt(ev.keyCode)] = false;
	},

	update: function() {
		var area = document.getElementById("area");
		
		var info = "Current connected people are: <br/>";
		for(var i = 0; i < App.remotePlayers.length; i++) {
			info += "<b>" + App.remotePlayers[i].name + "</b><br/>";
		}
		
		area.innerHTML = info;
		
		setTimeout(helper.hitch(this, this.update), 30);
	}

}