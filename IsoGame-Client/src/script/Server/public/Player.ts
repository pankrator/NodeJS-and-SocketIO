module MainModule {
    export class Player extends Entity implements NetworkUpdatable {

        public name: String;
        public direction: number;
        public stateMachine: StateMachine;

        private animationFrame: number;
        private originX: number;
        private originY: number;


        constructor(name: String, x: number, y: number, size: number,
             stateMachine: StateMachine) {
            super(x, y, size);
            this.name = name;
            this.animationFrame = 5;
            this.direction = 0;
            this.stateMachine = stateMachine;

            this.updateAnimationFrame();
        }

        public draw(context: CanvasRenderingContext2D): void {
            context.beginPath();

            var images = new Array<HTMLImageElement>();

            var img = new Image();
            img.src = "resources/Farmer/Walk/Farmer_Walk_Right.png";
            images.push(img);

            img = new Image();
            img.src = "resources/Farmer/Walk/Farmer_Walk_Up.png";
            images.push(img);

            img = new Image();
            img.src = "resources/Farmer/Walk/Farmer_Walk_Left.png";
            images.push(img);

            img = new Image();
            img.src = "resources/Farmer/Walk/Farmer_Walk_Down.png";
            images.push(img);

            var frameWidth = images[this.direction].width / 15;
            var frameHeight = images[this.direction].height;

            var iso = Renderer.screenToIso(this.x, this.y);
            context.drawImage(images[this.direction], frameWidth * this.animationFrame, 0, frameWidth, frameHeight, iso[0], iso[1], frameWidth, frameHeight);

        }

        public update(): void {
            this.move();
        }
		
		private updateAnimationFrame = (): void => {
            this.animationFrame++;
            if (this.animationFrame > 14) {
                this.animationFrame = 0;
            }
            setTimeout(this.updateAnimationFrame, 100);
        }

		public move(): void {
            if (App.inputManager.keys[KEYS.LEFT_ARROW]) {
                this.direction = 2;
                var grid = Renderer.getTileCoordinate(this.x - 2, this.y + 2);
                if (App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    this.x -= 2;
                    this.y += 2;
                }
            }
            if (App.inputManager.keys[KEYS.UP_ARROW]) {
                this.direction = 1;
                var grid = Renderer.getTileCoordinate(this.x - 2, this.y - 2);
                if (App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    this.x -= 2;
                    this.y -= 2;
                }
            }
            if (App.inputManager.keys[KEYS.RIGHT_ARROW]) {
                this.direction = 0;
                var grid = Renderer.getTileCoordinate(this.x + 2, this.y - 2);
                if (App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    this.x += 2;
                    this.y -= 2;
                }
            }
            if (App.inputManager.keys[KEYS.DOWN_ARROW]) {
                this.direction = 3
                var grid = Renderer.getTileCoordinate(this.x + 2, this.y + 2);
                if (App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    this.x += 2;
                    this.y +=2;
                }
            }
        }

        public updateState(data: any): void {
            for (var i = 0; i < data.length; i++) {
                this[data[i].name] = data[i].value;
            }
        }
    }
}
