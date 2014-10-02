var MainModule;
(function (MainModule) {
    var StateMachineUtils = (function () {
        function StateMachineUtils() {
        }
        StateMachineUtils.getDummyState = function (index) {
            return new MainModule.State(index, MainModule.State.emptyUpdate, StateMachineUtils.dummyEventHandler, StateMachineUtils.dummyEventHandler, StateMachineUtils.dummyPredicate);
        };

        StateMachineUtils.ensureAnimationLoop = function (hero) {
            //TODO: loop animation
            return true;
        };

        StateMachineUtils.restartAnimationIfNeeded = function (player, previousState) {
            //TODO: Restart animation if not in previous state
        };

        StateMachineUtils.getWalkingState = function () {
            var walking;

            var walkingEntry = function (previous, hero) {
                StateMachineUtils.restartAnimationIfNeeded(hero, previous);
                walking.data.isWalking = true;
            };

            var walkingUpdate = function (hero) {
                StateMachineUtils.ensureAnimationLoop(hero);

                walking.data.isWalking = false;
            };

            var walkingExit = function (next, hero) {
            };

            var walkingInterrupt = function (hero) {
                return !walking.data.isWalking;
            };

            walking = new MainModule.State(1 /* Walking */, walkingUpdate, walkingEntry, walkingExit, walkingInterrupt);

            return walking;
        };

        StateMachineUtils.getPlayerStates = function (player) {
            var transitions = new Array();
            transitions[0 /* Idle */] = [1 /* Walking */];
            transitions[1 /* Walking */] = [0 /* Idle */, 1 /* Walking */];

            var idleEntry = function (previous, hero) {
            };

            var idleUpdate = function (hero) {
                StateMachineUtils.ensureAnimationLoop(hero);
            };

            var idle = new MainModule.State(0 /* Idle */, idleUpdate, idleEntry, StateMachineUtils.dummyEventHandler, StateMachineUtils.dummyPredicate);
            var walking = StateMachineUtils.getWalkingState();

            var states = [idle, walking].sort(function (x, y) {
                return x.index - y.index;
            });

            return new MainModule.StateMachine(states, transitions, player);
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
