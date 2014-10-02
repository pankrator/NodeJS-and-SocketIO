module MainModule {
    export class Renderer {

        public context: CanvasRenderingContext2D;

        constructor(context: CanvasRenderingContext2D) {
            this.context = context;
        }

        public static screenToIso(screenX, screenY): number[] {
            var isoX = screenX - screenY;
            var isoY = (screenX + screenY) / 2;

            return [isoX, isoY];
        }

        public static isoToScreen(isoX, isoY) {
            var screenX = (2 * isoY + isoX) / 2;
            var screenY = (2 * isoY - isoX) / 2;

            return [screenX, screenY];
        }

        public static getTileCoordinate(screenX, screenY) {
            var gridX = Math.floor(screenX / 48);
            var gridY = Math.floor(screenY / 48);

            return [gridX, gridY];
        }

        public static gridToScreen(gridX, gridY) {
            var screenX = gridX * 48;
            var screenY = gridY * 48;

            return [screenX, screenY];
        }

        public render(camera: Camera): void {
            window.requestAnimationFrame((): void => {
                this.render(camera);
            });

            this.context.clearRect(0, 0, App.canvas.width, App.canvas.height);

            this.context.save();
            this.context.translate(camera.x, camera.y);

            App.tileMap.draw(this.context);

            //			App.world.player.draw( this.context )			
            var drawables = new Array<GameObject>();
            for (var id in App.world.remotePlayers) {
                drawables.push(App.world.remotePlayers[id]);
            }
//            for (var i = 0; i < App.tileMap.mapData.length; i++) {
//                for (var j = 0; j < App.tileMap.mapData[i].length; j++) {
//                    var tile = App.tileMap.mapData[i][j];
//                    if (tile == 1) {
//                        var screen = Renderer.gridToScreen(i, j);
//                        var iso = Renderer.screenToIso(screen[0], screen[1]);
//                        drawables.push({
//                            x: iso[0],
//                            y: iso[1],
//                            draw: function(ctx: CanvasRenderingContext2D) {
//                                
//                                ctx.drawImage(App.tileMap.images[0], iso[0] + 48, iso[1] + 48);
//                            }
//                        });
//                    }
//                }
//            }
            drawables.push(App.world.player);

            drawables.sort((a, b): number => {
                return a.y - b.y;
            });

            for (var i = 0; i < drawables.length; i++) {
                drawables[i].draw(this.context);
            }
            this.context.restore();

            if (App.inputManager.mouseDown) {
                var mouseX = App.inputManager.mouseX,
                    mouseY = App.inputManager.mouseY;
                this.context.strokeStyle = "green";
                var isoMouse = Renderer.screenToIso(mouseX, mouseY);

                this.context.moveTo((isoMouse[0] * 64 - isoMouse[1] * 64), (isoMouse[1] * 64 + isoMouse[0] * 64) / 2);
                this.context.lineTo(((isoMouse[0] + 1) * 64 - isoMouse[1] * 64), (isoMouse[1] * 64 + (isoMouse[0] + 1) * 64) / 2);
                this.context.lineTo(((isoMouse[0] + 1) * 64 - (isoMouse[1] + 1) * 64), ((isoMouse[1] + 1) * 64 + (isoMouse[0] + 1) * 64) / 2);

                //                this.context.lineTo((isoMouse[0] * 64 - isoMouse[1] * 64), (isoMouse[1] * 64 + isoMouse[0]) / 2);

                this.context.stroke();
            }
        }
    }
}
