module MainModule {
    export class StateMachineUtils {

        private static dummyEventHandler = (state: number, object: Entity) => { };
        private static dummyPredicate = (object: Entity) => false;

        private static getDummyState(index: number): State {
            return new State(index, State.emptyUpdate, StateMachineUtils.dummyEventHandler, StateMachineUtils.dummyEventHandler, StateMachineUtils.dummyPredicate);
        }
        
        
    }
}