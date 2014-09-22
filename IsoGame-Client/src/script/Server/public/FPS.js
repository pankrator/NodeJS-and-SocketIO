var MainModule;
(function (MainModule) {
    var FPS = (function () {
        function FPS() {
            this.startTime = 0;
            this.frameNumber = 0;
        }
        FPS.prototype.getFPS = function () {
            this.frameNumber++;
            var d = new Date().getTime(), currentTime = (d - this.startTime) / 1000, result = Math.floor((this.frameNumber / currentTime));

            if (currentTime > 1) {
                this.startTime = new Date().getTime();
                this.frameNumber = 0;
            }

            return result;
        };
        return FPS;
    })();
    MainModule.FPS = FPS;
})(MainModule || (MainModule = {}));
