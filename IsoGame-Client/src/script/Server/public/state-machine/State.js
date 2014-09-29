var MainModule;
(function (MainModule) {
    var State = (function () {
        function State(index, update, onEntry, onExit, interruptCondition, entranceCondition) {
            if (typeof entranceCondition === "undefined") { entranceCondition = State.truthPredicate; }
            this.index = index;
            this.onEntry = onEntry;
            this.onExit = onExit;
            this.interuptCondition = interruptCondition;
            this.entranceCondition = entranceCondition;

            this.update = update;

            this.data = {};
        }
        State.truthPredicate = function (target) {
            return true;
        };
        State.emptyUpdate = function (target) {
        };
        return State;
    })();
    MainModule.State = State;
})(MainModule || (MainModule = {}));
