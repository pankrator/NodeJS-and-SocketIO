var MainModule;
(function (MainModule) {
    var StateMachineUtils = (function () {
        function StateMachineUtils() {
        }
        StateMachineUtils.dummyEventHandler = function (state, object) {
        };
        StateMachineUtils.dummyPredicate = function (object) {
            return false;
        };
        return StateMachineUtils;
    })();
    MainModule.StateMachineUtils = StateMachineUtils;
})(MainModule || (MainModule = {}));
