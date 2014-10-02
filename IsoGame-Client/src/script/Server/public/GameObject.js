var MainModule;
(function (MainModule) {
    var GameObject = (function () {
        function GameObject() {
        }
        GameObject.prototype.draw = function (context) {
        };
        return GameObject;
    })();
    MainModule.GameObject = GameObject;
})(MainModule || (MainModule = {}));
