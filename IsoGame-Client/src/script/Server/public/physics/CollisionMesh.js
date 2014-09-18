var MainModule;
(function (MainModule) {
    var RectangleMesh = (function () {
        function RectangleMesh(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
        }
        return RectangleMesh;
    })();
    MainModule.RectangleMesh = RectangleMesh;
})(MainModule || (MainModule = {}));
