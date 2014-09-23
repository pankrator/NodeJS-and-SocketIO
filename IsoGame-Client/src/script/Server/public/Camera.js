var MainModule;
(function (MainModule) {
    var Camera = (function () {
        function Camera(width, height) {
            this.canvasWidth = width;
            this.canvasHeight = height;
        }
        Camera.prototype.follow = function (target) {
            this.x = -target.x + MainModule.App.canvas.width / 2;
            this.y = -target.y + MainModule.App.canvas.height / 2;
        };
        return Camera;
    })();
    MainModule.Camera = Camera;
})(MainModule || (MainModule = {}));
