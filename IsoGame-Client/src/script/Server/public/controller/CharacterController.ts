module MainModule {
    export class CharacterController {

        public character: Player;

        constructor(target: Player) {
            this.character = target;
        }

        public handleKeyboard(input: InputManager): void {
            var hero = this.character;

            if (input.keys[KEYS.LEFT_ARROW]) {
                hero.direction = 2;
                hero.stateMachine.tryTransitionTo(PlayerStates.Walking);
                var grid = Renderer.getTileCoordinate(hero.x - 2, hero.y + 2);
                if (App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    hero.x -= 2;
                    hero.y += 2;
                }
            }

            if (input.keys[KEYS.UP_ARROW]) {
                hero.direction = 1;
                hero.stateMachine.tryTransitionTo(PlayerStates.Walking);
                var grid = Renderer.getTileCoordinate(hero.x - 2, hero.y - 2);
                if (App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    hero.x -= 2;
                    hero.y -= 2;
                }
            }

            if (App.inputManager.keys[KEYS.RIGHT_ARROW]) {
                hero.direction = 0;
                hero.stateMachine.tryTransitionTo(PlayerStates.Walking);
                var grid = Renderer.getTileCoordinate(hero.x + 2, hero.y - 2);
                if (App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    hero.x += 2;
                    hero.y -= 2;
                }
            }

            if (App.inputManager.keys[KEYS.DOWN_ARROW]) {
                hero.direction = 3
                hero.stateMachine.tryTransitionTo(PlayerStates.Walking);
                var grid = Renderer.getTileCoordinate(hero.x + 2, hero.y + 2);
                if (App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    hero.x += 2;
                    hero.y += 2;
                }
            }
            
            hero.stateMachine.tryTransitionTo(PlayerStates.Idle);

            hero.stateMachine.update();

        }
    }
}