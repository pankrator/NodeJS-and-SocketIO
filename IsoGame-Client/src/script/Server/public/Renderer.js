var MainModule;
(function (MainModule) {
    var Renderer = (function () {
        function Renderer(context) {
            this.context = context;
        }
        Renderer.prototype.render = function (camera) {
            this.context.clearRect(0, 0, camera.canvasWidth, camera.canvasHeight);
            this.context.save();
            this.context.translate(camera.x, camera.y);

            MainModule.App.tileMap.draw(this.context);

            //			App.world.player.draw( this.context )
            var remotes = new Array();
            for (var id in MainModule.App.world.remotePlayers) {
                remotes.push(MainModule.App.world.remotePlayers[id]);
            }
            remotes.push(MainModule.App.world.player);

            remotes.sort(function (a, b) {
                return a.y - b.y;
            });

            for (var i = 0; i < remotes.length; i++) {
                remotes[i].draw(this.context);
            }
            this.context.restore();
        };
        return Renderer;
    })();
    MainModule.Renderer = Renderer;
})(MainModule || (MainModule = {}));
//var Renderer = function(context) {
//	this.context = context;
//
//}
//
//Renderer.prototype.render = function() {
//
//	this.context.clearRect(0,0, 800, 800);
//
//	this.context.save();
//
//	this.context.translate(App.camera.x, App.camera.y);
//
//	App.tileMap.draw(this.context);
//
//	App.world.player.draw(this.context);
//
//	for(var i = 0; i < App.world.remotePlayers.length; i++) {
//		App.world.remotePlayers[i].draw(this.context);
//	}
//	/*
//	for(var i = 0; i < App.world.map.walls.length; i++) {
//		App.world.map.walls[i].draw(this.context);
//	}
//	*/
//	for(var i = 0; i < App.world.entities.length; i++) {
//		App.world.entities[i].draw(this.context);
//	}
//
//	this.context.restore();
//}
//
