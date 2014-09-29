module MainModule {
    export class StateMachine {

        private currentState: number;
        private transitions: Array<Array<number>>;
        private target: Entity;

        public states: Array<State>;
        public get current() {
            return this.currentState;
        }

        constructor(states: Array<State>, transitions: Array<Array<number>>, target: Entity) {
            this.currentState = 0;
            this.states = states;
            this.transitions = transitions;
            this.target = target;
        }

        public tryTransitionTo(nextState: number): boolean {
            var canTransit = (this.states[this.currentState].interuptCondition(this.target) ||
                this.transitions[this.currentState].indexOf(nextState) != -1) &&
                this.states[nextState].entranceCondition(this.target);

            if (canTransit) {
                var previous = this.currentState;
                this.currentState = nextState;
                this.states[previous].onEntry(this.currentState, this.target);
                this.states[this.currentState].onEntry(previous, this.target);
            }
            
            return canTransit;
        }

        public update(): void {
            this.states[this.currentState].update(this.target);
        }
    }
}