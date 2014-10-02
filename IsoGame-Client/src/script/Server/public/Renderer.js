var MainModule;
(function (MainModule) {
    var Renderer = (function () {
        function Renderer(context) {
            this.context = context;
        }
        Renderer.screenToIso = function (screenX, screenY) {
            var isoX = screenX - screenY;
            var isoY = (screenX + screenY) / 2;

            return [isoX, isoY];
        };

        Renderer.isoToScreen = function (isoX, isoY) {
            var screenX = (2 * isoY + isoX) / 2;
            var screenY = (2 * isoY - isoX) / 2;

            return [screenX, screenY];
        };

        Renderer.getTileCoordinate = function (screenX, screenY) {
            var gridX = Math.floor(screenX / 48);
            var gridY = Math.floor(screenY / 48);

            return [gridX, gridY];
        };

        Renderer.gridToScreen = function (gridX, gridY) {
            var screenX = gridX * 48;
            var screenY = gridY * 48;

            return [screenX, screenY];
        };

        Renderer.prototype.render = function (camera) {
            var _this = this;
            window.requestAnimationFrame(function () {
                _this.render(camera);
            });

            this.context.clearRect(0, 0, MainModule.App.canvas.width, MainModule.App.canvas.height);

            this.context.save();
            this.context.translate(camera.x, camera.y);

            MainModule.App.tileMap.draw(this.context);

            //			App.world.player.draw( this.context )
            var drawables = new Array();
            for (var id in MainModule.App.world.remotePlayers) {
                drawables.push(MainModule.App.world.remotePlayers[id]);
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
            drawables.push(MainModule.App.world.player);

            drawables.sort(function (a, b) {
                return a.y - b.y;
            });

            for (var i = 0; i < drawables.length; i++) {
                drawables[i].draw(this.context);
            }
            this.context.restore();

            if (MainModule.App.inputManager.mouseDown) {
                var mouseX = MainModule.App.inputManager.mouseX, mouseY = MainModule.App.inputManager.mouseY;
                this.context.strokeStyle = "green";
                var isoMouse = Renderer.screenToIso(mouseX, mouseY);

                this.context.moveTo((isoMouse[0] * 64 - isoMouse[1] * 64), (isoMouse[1] * 64 + isoMouse[0] * 64) / 2);
                this.context.lineTo(((isoMouse[0] + 1) * 64 - isoMouse[1] * 64), (isoMouse[1] * 64 + (isoMouse[0] + 1) * 64) / 2);
                this.context.lineTo(((isoMouse[0] + 1) * 64 - (isoMouse[1] + 1) * 64), ((isoMouse[1] + 1) * 64 + (isoMouse[0] + 1) * 64) / 2);

                //                this.context.lineTo((isoMouse[0] * 64 - isoMouse[1] * 64), (isoMouse[1] * 64 + isoMouse[0]) / 2);
                this.context.stroke();
            }
        };
        return Renderer;
    })();
    MainModule.Renderer = Renderer;
})(MainModule || (MainModule = {}));
