var MainModule;
(function (MainModule) {
    var NetworkObjectCreator = (function () {
        function NetworkObjectCreator() {
        }
        NetworkObjectCreator.create = function (object, socket, context, id) {
            var networkView = new MainModule.NetworkView(object, socket, context, id);

            return networkView;
        };
        return NetworkObjectCreator;
    })();
    MainModule.NetworkObjectCreator = NetworkObjectCreator;
})(MainModule || (MainModule = {}));
