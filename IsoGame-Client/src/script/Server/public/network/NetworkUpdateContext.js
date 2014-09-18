var MainModule;
(function (MainModule) {
    (function (NetworkUpdateContext) {
        NetworkUpdateContext[NetworkUpdateContext["PLAYER"] = 0] = "PLAYER";
        NetworkUpdateContext[NetworkUpdateContext["WORLD"] = 1] = "WORLD";
    })(MainModule.NetworkUpdateContext || (MainModule.NetworkUpdateContext = {}));
    var NetworkUpdateContext = MainModule.NetworkUpdateContext;
})(MainModule || (MainModule = {}));
