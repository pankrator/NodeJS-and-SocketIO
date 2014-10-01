var MainModule;
(function (MainModule) {
    var StateMachineUtils = (function () {
        function StateMachineUtils() {
        }
        StateMachineUtils.getDummyState = function (index) {
            return new MainModule.State(index, MainModule.State.emptyUpdate, StateMachineUtils.dummyEventHandler, StateMachineUtils.dummyEventHandler, StateMachineUtils.dummyPredicate);
        };
        StateMachineUtils.dummyEventHandler = function (state, object) {
        };
        StateMachineUtils.dummyPredicate = function (object) {
            return false;
        };
        return StateMachineUtils;
    })();
    MainModule.StateMachineUtils = StateMachineUtils;
})(MainModule || (MainModule = {}));
