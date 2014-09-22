
module MainModule {
	export class App {
        
        public static fps : FPS; 
        
        public static basivEventHandler: BasicEventHandler;
        //		public worldEventHandler: WorldEventHdler;
		
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
            this.fps = new FPS();
            var img = new Image();
            img.src = "resources/bla5.png";
            var tree = new Image();
            tree.src = "resources/isometric-plant-pack/isometric tiles/pine-full04.png";
            var tileImages = new Array<HTMLImageElement>();
            tileImages.push(img, tree);

            this.canvas = <HTMLCanvasElement>document.getElementById("game");
            this.renderer = new Renderer(this.canvas.getContext("2d"));
            this.camera = new Camera(800, 800);
            this.tileMap = new TileMap(800, 800, tileImages);

            this.world = new World();

            this.socket = io.connect("", { port: 8000, transports: ["websocket"] });

            this.basivEventHandler = new BasicEventHandler(this.socket, this.world);
            //			this.worldEventHandler = new WorldEventHandler(this.socket, ts.world);
		
            this.inputManager = new InputManager();

            window.requestAnimationFrame((): void => {
                this.renderer.render(this.camera);
            });
        }

		public static start(): void {
			this.world.update();
			this.camera.follow(this.world.player);
            
            window.setTimeout(Helper.hitch(this, this.start), 1000 / 60);
		}
	}
}

window.onload = function() {
    MainModule.App.init();
}