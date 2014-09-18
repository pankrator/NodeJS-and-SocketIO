var MainModule;
(function (MainModule) {
    var Helper = (function () {
        function Helper() {
        }
        Helper.hitch = function (context, f) {
            return function (args) {
                f.call(context, args);
            };
        };
        return Helper;
    })();
    MainModule.Helper = Helper;
})(MainModule || (MainModule = {}));
