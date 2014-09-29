module MainModule {
    export class StateMachineUtils {

        private static dummyEventHandler = (state: number, object: Entity) => { };
        private static dummyPredicate = (object: Entity) => false;
    }
}