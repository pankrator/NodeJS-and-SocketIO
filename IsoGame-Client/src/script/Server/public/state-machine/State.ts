module MainModule {
    export class State {

        public index: number;
        public onEntry: (previous: number, target: Entity) => void;
        public onExit: (next: number, target: Entity) => void;
        public interuptCondition: (target: Entity) => boolean;
        public entranceCondition: (target: Entity) => boolean;

        public update: (target: Entity) => void;
        public data: any;

        private static truthPredicate = (target: Entity) => true;
        public static emptyUpdate = (target: Entity) => { };

        constructor(index: number,
            update: (target: Entity) => void,
            onEntry: (previous: number, target: Entity) => void,
            onExit: (next: number, target: Entity) => void,
            interruptCondition: (target: Entity) => boolean,
            entranceCondition: (target: Entity) => boolean = State.truthPredicate) {
            
            this.index = index;
            this.onEntry = onEntry;
            this.onExit = onExit;
            this.interuptCondition = interruptCondition;
            this.entranceCondition = entranceCondition;
            
            this.update = update;
            
            this.data = {};
        }
    }
}