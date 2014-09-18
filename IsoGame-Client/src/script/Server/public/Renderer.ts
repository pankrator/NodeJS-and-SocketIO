module MainModule {
	export class Renderer {

		public context: CanvasRenderingContext2D;

		constructor( context: CanvasRenderingContext2D ) {
			this.context = context;
		}

		public render( camera: Camera ): void {
			this.context.clearRect( 0, 0, camera.canvasWidth, camera.canvasHeight );
			this.context.save();
			this.context.translate( camera.x, camera.y );

			App.tileMap.draw( this.context );

			//			App.world.player.draw( this.context )			
			var remotes = new Array<Player>();
			for ( var id in App.world.remotePlayers ) {
				remotes.push( App.world.remotePlayers[id] );
			}
			remotes.push( App.world.player );

			remotes.sort( ( a, b ): number => {
				return a.y - b.y;
			});
			//			Object.keys(App.world.remotePlayers).sort(function(a, b) {
			//				return App.world.remotePlayers[a].y < App.world.remotePlayers[b].y;
			//	});

			//			for ( var id in App.world.remotePlayers ) {
			//				App.world.remotePlayers[id].draw( this.context );
			//			}
			for ( var i = 0; i < remotes.length; i++ ) {
				remotes[i].draw( this.context );
			}
			this.context.restore();
		}
	}
}

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
