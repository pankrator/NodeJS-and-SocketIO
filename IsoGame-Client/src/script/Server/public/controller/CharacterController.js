var MainModule;
(function (MainModule) {
    var CharacterController = (function () {
        function CharacterController(target) {
            this.character = target;
        }
        CharacterController.prototype.handleKeyboard = function (input) {
            var hero = this.character;

            if (input.keys[KEYS.LEFT_ARROW]) {
                hero.direction = 2;
                hero.stateMachine.tryTransitionTo(1 /* Walking */);
                var grid = MainModule.Renderer.getTileCoordinate(hero.x - 2, hero.y + 2);
                if (MainModule.App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    hero.x -= 2;
                    hero.y += 2;
                }
            }

            if (input.keys[KEYS.UP_ARROW]) {
                hero.direction = 1;
                hero.stateMachine.tryTransitionTo(1 /* Walking */);
                var grid = MainModule.Renderer.getTileCoordinate(hero.x - 2, hero.y - 2);
                if (MainModule.App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    hero.x -= 2;
                    hero.y -= 2;
                }
            }

            if (MainModule.App.inputManager.keys[KEYS.RIGHT_ARROW]) {
                hero.direction = 0;
                hero.stateMachine.tryTransitionTo(1 /* Walking */);
                var grid = MainModule.Renderer.getTileCoordinate(hero.x + 2, hero.y - 2);
                if (MainModule.App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    hero.x += 2;
                    hero.y -= 2;
                }
            }

            if (MainModule.App.inputManager.keys[KEYS.DOWN_ARROW]) {
                hero.direction = 3;
                hero.stateMachine.tryTransitionTo(1 /* Walking */);
                var grid = MainModule.Renderer.getTileCoordinate(hero.x + 2, hero.y + 2);
                if (MainModule.App.tileMap.mapData[grid[0]][grid[1]] != 1) {
                    hero.x += 2;
                    hero.y += 2;
                }
            }

            hero.stateMachine.tryTransitionTo(0 /* Idle */);

            hero.stateMachine.update();
        };
        return CharacterController;
    })();
    MainModule.CharacterController = CharacterController;
})(MainModule || (MainModule = {}));
