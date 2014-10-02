var MainModule;
(function (MainModule) {
    var Camera = (function () {
        function Camera(width, height) {
            this.canvasWidth = width;
            this.canvasHeight = height;
        }
        Camera.prototype.follow = function (target) {
            var targetIso = MainModule.Renderer.screenToIso(target.x, target.y);
            this.x = -targetIso[0] + MainModule.App.canvas.width / 2;
            this.y = -targetIso[1] + MainModule.App.canvas.height / 2;
        };
        return Camera;
    })();
    MainModule.Camera = Camera;
})(MainModule || (MainModule = {}));
