var MainModule;
(function (MainModule) {
    var World = (function () {
        function World() {
            this.remotePlayers = new Array();
            this.entities = new Array();
        }
        World.prototype.update = function () {
            this.playerController.handleKeyboard(MainModule.App.inputManager);
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].update();
            }
        };
        return World;
    })();
    MainModule.World = World;
})(MainModule || (MainModule = {}));
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
