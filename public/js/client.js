var App = {
    
	remotePlayers: [],
	walls: [],
	
	basicEventHandler: null,
	worldEventHandler: null,
	world: null,
	canvas: null,
	renderer: null,
	inputManager: null,
	
	ready: null,
	
	socket: null,
    
    init: function() {
		this.socket = io.connect("", {port: 8000, transports: ["websocket"]});
		
		this.canvas = document.getElementById("game");
		this.renderer = new Renderer(this.canvas.getContext("2d"));
		
		this.world = new World();
		this.basicEventHandler = new BasicEventHandler(this.socket, this.world);
		this.worldEventHandler = new WorldEventHandler(this.socket, this.world);
		
		this.inputManager = new InputManager();
		
        //this.bindEvents();
		
		//var name = prompt("Type your player name", "asd");
		//Player.name = name;
		
		//Game.init();
		//Game.update();
		//Game.updateWalls();
		//Player.update();
		//Game.drawOnce();
		//Game.draw();
    },
	
	start: function() {
		
		this.world.update();
		this.renderer.render();
		
		setTimeout(helper.hitch(this, this.start), 20);
	},
    
    bindEvents: function() {
		/** Basic game events **/
		
        this.socket.on("connected", helper.hitch(this, this._onConnected));
		this.socket.on("newPlayerConnected", helper.hitch(this, this._onPlayerConnected));
		this.socket.on("handleAllPlayers", helper.hitch(this, this._handleAllPlayers));
		this.socket.on("removePlayer", helper.hitch(this, this._handleRemovePlayer));
		
		/** Game Specific events **/
		this.socket.on("stickerMove", helper.hitch(this, this._handleStickerMove));
		
		/** Environment Specific events **/
		this.socket.on("sendWalls", helper.hitch(this, this._handleSendWalls));
    },
	
	_handleSendWalls: function(data) {
		this.walls = data;
		Game.drawOnce();
	},
	
	_handleRemovePlayer: function(data) {
		var ind = this.findPlayer(data.uniqueSocket);
		this.remotePlayers.splice(ind,1);
		console.log("Player with name " + data.name + " has just disconnected");
	},
	
	findPlayer: function(id) {
		for(var i = 0; i < this.remotePlayers.length; i++) {
			if(this.remotePlayers[i].uniqueSocket == id) {
				return i;
			}
		}
	},
    
    _onConnected: function(data) {
		this.socket.emit("getAllPlayers");

		var newPlayer = {
			name: Player.name,
			uniqueSocket: this.socket.socket.sessionid
		};
		
		Player.create(newPlayer);
		this.socket.emit("newPlayerConnected", Player);
    },
	
	_handleAllPlayers: function(/* Array */allPlayers) {
		this.remotePlayers = allPlayers;
	},
	
	_onPlayerConnected: function(data) {
		this.remotePlayers.push(data);
		console.log("Server: Hey! New player has just connected his name is " + data.name);
	},
	
	_handleStickerMove: function(data) {
		var ind = this.findPlayer(data.uniqueSocket);
		this.remotePlayers[ind].sticker.x = data.x;
		this.remotePlayers[ind].sticker.y = data.y;
	},
	
	createGame: function() {
		this.socket.emit("hostCreateNewRoom");
	}
};

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
	
	/**
		Holds the main canvas object
	**/
	canvas: null,
	/**
		Holds the main canvas context
	**/
	ctx: null,
	/**
		Use this static ctx to draw static objects on it
	**/
	staticCtx: null,
	bounds: null,
	
	init: function() {
		this.canvas = document.getElementById("game");
		this.ctx = this.canvas.getContext("2d");
		this.staticCtx = document.getElementById("static").getContext("2d");
		this.bounds = this.canvas.getBoundingClientRect();
				
		window.addEventListener("keydown", helper.hitch(this, this._processKeyboardDown), false);
		window.addEventListener("keyup", helper.hitch(this, this._processKeyboardUp), false);
		this.canvas.addEventListener("mousemove", helper.hitch(this, this._processMouseMove), false);
		this.canvas.addEventListener("mousedown", helper.hitch(this, this._processMouseDown), false);
		this.canvas.addEventListener("mouseup", helper.hitch(this, this._processMouseUp), false);
	},
	
	_processMouseMove: function(ev) {
		this.bounds = this.canvas.getBoundingClientRect();
		this.mouse.x = ev.clientX - this.bounds.left;
		this.mouse.y = ev.clientY - this.bounds.top;
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
		
		setTimeout(helper.hitch(this, this.update), 300);
	},
	
	updateWalls: function() {
		App.socket.emit("requestWalls");
		setTimeout(helper.hitch(this, this.updateWalls), 5000);
	},
	
	draw: function() {
		this.ctx.clearRect(0, 0, 800, 800);
		for(var i = 0; i < App.remotePlayers.length; i++) {
			var currPlayer = App.remotePlayers[i];
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(currPlayer.sticker.x, currPlayer.sticker.y, currPlayer.sticker.width, currPlayer.sticker.height);
			this.ctx.fillText(currPlayer.name, currPlayer.sticker.x, currPlayer.sticker.y);
			this.ctx.fill();
		}
		
		Sticker.draw();
		
		setTimeout(helper.hitch(this, this.draw), 10);
	},
	
	drawOnce: function() {
		this.staticCtx.clearRect(0, 0, 800, 800);
		
		this.staticCtx.fillRect(10,10,100,100);
		this.staticCtx.fill();
		/*
		this.staticCtx.clearRect(0, 0, 800, 800);
		for(var i = 0; i < App.walls.length; i++) {
			var w = new Wall();
			w.copy(App.walls[i]);
			w.draw(this.staticCtx);
		}
		*/
	}
}

var Sticker = {
	x: 0,
	y: 0,
	width: 50,
	height: 50,
	color: "#ff3e4d",
	
	draw: function() {
		Game.ctx.fillStyle = this.color;
		Game.ctx.fillRect(this.x, this.y, this.width, this.height);
		Game.ctx.fill();
		//setTimeout(helper.hitch(this, this.draw), 20);
	},
	
	isInside: function(x, y) {
		if(x >= this.x && x <= this.x + this.width &&
			y >= this.y && y <= this.y + this.height) {
			return true;
		}
		return false;
	}
}