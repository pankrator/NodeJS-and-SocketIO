var App = {
	
	basicEventHandler: null,
	worldEventHandler: null,
	
	world: null,
	
	canvas: null,
	renderer: null,
	tileMap: null,
	
	camera: null,
	inputManager: null,
	
	ready: null,
	
	socket: null,
    
    init: function() {
		this.socket = io.connect("", {port: 8000, transports: ["websocket"]});
		
		this.canvas = document.getElementById("game");
		this.renderer = new Renderer(this.canvas.getContext("2d"));
		this.camera = new Camera();
		
		var img = new Image();
		img.src = "js/bla5.png"
		this.tileMap = new TileMap(600, 600, img);
		this.world = new World();
		this.basicEventHandler = new BasicEventHandler(this.socket, this.world);
		this.worldEventHandler = new WorldEventHandler(this.socket, this.world);
		
		this.inputManager = new InputManager();
    },
	
	start: function() {
		
		this.world.update();
		this.renderer.render();
		this.camera.follow(this.world.player);
		
		setTimeout(helper.hitch(this, this.start), 20);
	}
};