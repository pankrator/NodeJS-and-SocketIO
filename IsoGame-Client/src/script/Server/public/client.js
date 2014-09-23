var MainModule;
(function (MainModule) {
    var App = (function () {
        function App() {
        }
        App.init = function () {
            var _this = this;
            this.fps = new MainModule.FPS();
            var img = new Image();
            img.src = "resources/bla5.png";
            var tree = new Image();
            tree.src = "resources/isometric-plant-pack/isometric tiles/pine-full04.png";
            var tileImages = new Array();
            tileImages.push(img, tree);

            this.canvas = document.getElementById("game");
            this.renderer = new MainModule.Renderer(this.canvas.getContext("2d"));
            this.camera = new MainModule.Camera(800, 800);
            this.tileMap = new MainModule.TileMap(800, 800, tileImages);

            this.world = new MainModule.World();

            this.socket = io.connect("", { port: 8000, transports: ["websocket"] });

            this.basivEventHandler = new MainModule.BasicEventHandler(this.socket, this.world);

            //			this.worldEventHandler = new WorldEventHandler(this.socket, ts.world);
            this.inputManager = new MainModule.InputManager();

            window.requestAnimationFrame(function () {
                _this.renderer.render(_this.camera);
            });
        };

        App.start = function () {
            this.world.update();
            this.camera.follow(this.world.player);

            window.setTimeout(MainModule.Helper.hitch(this, this.start), 1000 / 60);
        };
        return App;
    })();
    MainModule.App = App;
})(MainModule || (MainModule = {}));

window.onload = function () {
    MainModule.Resizer.installHandler(document.getElementById("game"));
    MainModule.App.init();
};
