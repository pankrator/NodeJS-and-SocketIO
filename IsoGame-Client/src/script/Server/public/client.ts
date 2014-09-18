
module MainModule {
	export class App {
	
		public static basivEventHandler: BasicEventHandler;
//		public worldEventHandler: WorldEventHandler;
		
		public static world: World;
		
		public static canvas: HTMLCanvasElement;
		public static renderer: Renderer;
		public static tileMap: TileMap;
		
		public static camera: Camera;
		public static inputManager: InputManager;
		
		public static socket: SocketIO.SocketNamespace;

		constructor() {
		}
		
		public static init(): void {
			var img = new Image();
			img.src = "resources/bla5.png";
			
			this.canvas = <HTMLCanvasElement>document.getElementById("game");
			this.renderer = new Renderer(this.canvas.getContext("2d"));
			this.camera = new Camera(800, 800);
			this.tileMap = new TileMap(800, 800, img);
			
			this.world = new World();

			this.socket = io.connect("", {port: 8000, transports: ["websocket"]});
			
			this.basivEventHandler = new BasicEventHandler(this.socket, this.world);
//			this.worldEventHandler = new WorldEventHandler(this.socket, this.world);
		
			this.inputManager = new InputManager();
			
		}
		
		public static start(): void {
			this.world.update();
			this.renderer.render(this.camera);
			this.camera.follow(this.world.player);
			
			window.setTimeout(Helper.hitch(this, this.start), 20);
		}
	}
}

window.onload = function() {
	MainModule.App.init();
}