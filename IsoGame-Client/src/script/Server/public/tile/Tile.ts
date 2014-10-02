module MainModule {
    export class Tile {

        public objects: Array<GameObject>;

        constructor() {
            this.objects = new Array<GameObject>();
        }

        public addObject(object: GameObject): void {
            this.objects.push(object);
        }

        public removeObject(object: GameObject): void {
            for (var i = 0; i < this.objects.length; i++) {
                if (this.objects[i] == object) {
                    delete this.objects[i];
                }
            }
        }

        public draw(context: CanvasRenderingContext2D): void {
            for (var i = 0; i < this.objects.length; i++) {
                this.objects[i].draw(context);
            }
        }
    }
}