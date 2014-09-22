var MainModule;
(function (MainModule) {
    var InputManager = (function () {
        function InputManager() {
            var _this = this;
            this.handleKeyDown = function (key) {
                _this.keys[key.keyCode] = true;
            };
            this.handleKeyUp = function (key) {
                _this.keys[key.keyCode] = false;
            };
            this.handleMouseMove = function (mouse) {
                var bounds = MainModule.App.canvas.getBoundingClientRect();
                _this.mouseX = mouse.clientX - bounds.left;
                _this.mouseY = mouse.clientY - bounds.top;
            };
            this.handleMouseDown = function (mouse) {
                _this.mouseDown = true;
            };
            this.handleMouseUp = function (mouse) {
                _this.mouseDown = false;
            };
            this.keys = new Array();
            this.mouseX = 0;
            this.mouseY = 0;

            window.addEventListener("keydown", this.handleKeyDown, false);
            window.addEventListener("keyup", this.handleKeyUp, false);
            window.addEventListener("mousemove", this.handleMouseMove, false);
            window.addEventListener("mousedown", this.handleMouseDown, false);
            window.addEventListener("mouseup", this.handleMouseUp, false);
        }
        return InputManager;
    })();
    MainModule.InputManager = InputManager;
})(MainModule || (MainModule = {}));
