module MainModule {
	export class World {
		
		public remotePlayers: Player[];
		public entities: Entity[];
		public player: Player;
        public playerController: CharacterController;
		
		constructor() {
			this.remotePlayers = new Array<Player>();
			this.entities = new Array<Entity>();
		}
		
		public update(): void {
            this.playerController.handleKeyboard(App.inputManager);
			for(var i = 0; i < this.entities.length; i++) {
				this.entities[i].update();
			}
		}
	}	
}

//var World = function() {
//
//	
//	this.findPlayer = function(id) {
//		for(var i = 0; i < this.remotePlayers.length; i++) {
//			if(this.remotePlayers[i].uniqueSocket == id) {
//				return i;
//			}
//		}
//	}
//}