var MainModule;
(function (MainModule) {
    var Resizer = (function () {
        function Resizer() {
        }
        Resizer.installHandler = function (canvas) {
            var onresize = function () {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                window.aspect = canvas.width / canvas.height;
            };
            onresize();
            window.onresize = onresize;
        };
        return Resizer;
    })();
    MainModule.Resizer = Resizer;
})(MainModule || (MainModule = {}));
