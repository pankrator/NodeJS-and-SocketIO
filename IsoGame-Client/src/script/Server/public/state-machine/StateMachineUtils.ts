module MainModule {
    export class StateMachineUtils {

        private static dummyEventHandler = (state: number, object: Entity) => { };
        private static dummyPredicate = (object: Entity) => false;

        private static getDummyState(index: number): State {
            return new State(index, State.emptyUpdate, StateMachineUtils.dummyEventHandler, StateMachineUtils.dummyEventHandler, StateMachineUtils.dummyPredicate);
        }

        private static ensureAnimationLoop(hero: Player): boolean {
            //TODO: loop animation
            return true;
        }

        private static restartAnimationIfNeeded(player: Player, previousState: number): void {
            //TODO: Restart animation if not in previous state
        }

        private static getWalkingState(): State {
            var walking: State;

            var walkingEntry = (previous: number, hero: Player): void => {

                StateMachineUtils.restartAnimationIfNeeded(hero, previous);
                walking.data.isWalking = true;
            }

            var walkingUpdate = (hero: Player): void => {
                StateMachineUtils.ensureAnimationLoop(hero);

                walking.data.isWalking = false;
            }

            var walkingExit = (next: number, hero: Player): void => {

            }

            var walkingInterrupt = (hero: Player): boolean => {
                return !walking.data.isWalking;
            }

            walking = new State(PlayerStates.Walking, walkingUpdate, walkingEntry, walkingExit, walkingInterrupt);

            return walking;
        }

        public static getPlayerStates(player: Player) {
            var transitions = new Array<Array<number>>();
            transitions[PlayerStates.Idle] = [PlayerStates.Walking];
            transitions[PlayerStates.Walking] = [PlayerStates.Idle, PlayerStates.Walking];

            var idleEntry = (previous: number, hero: Player): void => {

            }

            var idleUpdate = (hero: Player): void => {
                StateMachineUtils.ensureAnimationLoop(hero);
            }

            var idle = new State(PlayerStates.Idle, idleUpdate, idleEntry, StateMachineUtils.dummyEventHandler, StateMachineUtils.dummyPredicate);
            var walking = StateMachineUtils.getWalkingState();
            
            var states = [idle, walking].sort((x, y) => x.index - y.index);
            
            return new StateMachine(states, transitions, player);
        }

    }
}