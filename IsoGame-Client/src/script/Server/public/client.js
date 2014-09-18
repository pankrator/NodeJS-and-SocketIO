var MainModule;
(function (MainModule) {
    var App = (function () {
        function App() {
        }
        App.init = function () {
            var img = new Image();
            img.src = "resources/bla5.png";

            this.canvas = document.getElementById("game");
            this.renderer = new MainModule.Renderer(this.canvas.getContext("2d"));
            this.camera = new MainModule.Camera(800, 800);
            this.tileMap = new MainModule.TileMap(800, 800, img);

            this.world = new MainModule.World();

            this.socket = io.connect("", { port: 8000, transports: ["websocket"] });

            this.basivEventHandler = new MainModule.BasicEventHandler(this.socket, this.world);

            //			this.worldEventHandler = new WorldEventHandler(this.socket, this.world);
            this.inputManager = new MainModule.InputManager();
        };

        App.start = function () {
            this.world.update();
            this.renderer.render(this.camera);
            this.camera.follow(this.world.player);

            window.setTimeout(MainModule.Helper.hitch(this, this.start), 20);
        };
        return App;
    })();
    MainModule.App = App;
})(MainModule || (MainModule = {}));

window.onload = function () {
    MainModule.App.init();
};
