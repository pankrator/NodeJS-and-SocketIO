var App = function() {
}

App.prototype.init = function() {
	
}

var App = {
    
	remotePlayers: [],
	
	socket: null,
    
    init: function() {
		this.socket = io.connect("", {port: 8000, transports: ["websocket"]});
        this.bindEvents();
		Player.name = prompt("Type your player name");
		Game.init();
		Game.update();
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
	}
}

var Game = {
	
	keys: null,
	
	init: function() {
		window.addEventListener("keydown", this._processKeyboardDown, false);
		window.addEventListener("keyup", this._processKeyboardUp, false);
	},
	
	_processKeyboardDown: function(ev) {
		console.log(ev.keyCode);
		// keys[ev.keyCode] = true;
	},
	
	_processKeyboardUp: function(ev) {
		console.log(ev.keyCode);
		// keys[ev.keyCode] = false;
		console.log(ev);
	},

	update: function() {
		var area = document.getElementById("area");
		
		var info = "Current connected people are: <br/>";
		for(var i = 0; i < App.remotePlayers.length; i++) {
			info += "<b>" + App.remotePlayers[i].name + "</b><br/>";
		}
		
		area.innerHTML = info;
		
		var me = this;
		setTimeout(function() { me.update(); }, 30);
	}

}