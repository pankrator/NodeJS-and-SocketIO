module MainModule {
    export class CharacterController {

        public character: Player;

        constructor(target: Player) {
            this.character = target;
        }

        public handleKeyboard(input: InputManager): void {
            var hero = this.character;

            hero.stateMachine.update();

            if (input.keys[KEYS.LEFT_ARROW]) {
                hero.direction = 2;
                var grid(Renderer.getTileCoordinate(
            }
            
            if (App.inputManager.keys[KEYS.LEFT_ARROW]) {
                this.direction = 2;
                var grid = Renderer.getTileCoordinate(this.x + 68 - 2, this.y + 100 + 2);
                if (App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    this.x -= 2;
                    this.y += 2;
                }
            }
            if (App.inputManager.keys[KEYS.UP_ARROW]) {
                this.direction = 1;
                var grid = Renderer.getTileCoordinate(this.x + 68 - 2, this.y + 100 - 2);
                if (App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    this.x -= 2;
                    this.y -= 2;
                }
            }
            if (App.inputManager.keys[KEYS.RIGHT_ARROW]) {
                this.direction = 0;
                var grid = Renderer.getTileCoordinate(this.x + 68 + 2, this.y + 100 - 2);
                if (App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    this.x += 2;
                    this.y -= 2;
                }
            }
            if (App.inputManager.keys[KEYS.DOWN_ARROW]) {
                this.direction = 3
                var grid = Renderer.getTileCoordinate(this.x + 68 + 2, this.y + 100 + 2);
                if (App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    this.x += 2;
                    this.y +=2;
                }
            }
            
        }
    }
}