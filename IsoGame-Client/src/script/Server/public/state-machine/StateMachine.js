var MainModule;
(function (MainModule) {
    var StateMachine = (function () {
        function StateMachine(states, transitions, target) {
            this.currentState = 0;
            this.states = states;
            this.transitions = transitions;
            this.target = target;
        }
        Object.defineProperty(StateMachine.prototype, "current", {
            get: function () {
                return this.currentState;
            },
            enumerable: true,
            configurable: true
        });

        StateMachine.prototype.tryTransitionTo = function (nextState) {
            var canTransit = (this.states[this.currentState].interuptCondition(this.target) || this.transitions[this.currentState].indexOf(nextState) != -1) && this.states[nextState].entranceCondition(this.target);

            if (canTransit) {
                var previous = this.currentState;
                this.currentState = nextState;
                this.states[previous].onEntry(this.currentState, this.target);
                this.states[this.currentState].onEntry(previous, this.target);
            }

            return canTransit;
        };

        StateMachine.prototype.update = function () {
            this.states[this.currentState].update(this.target);
        };
        return StateMachine;
    })();
    MainModule.StateMachine = StateMachine;
})(MainModule || (MainModule = {}));
