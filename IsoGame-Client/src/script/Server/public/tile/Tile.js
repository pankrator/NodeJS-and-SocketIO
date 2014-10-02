var MainModule;
(function (MainModule) {
    var Tile = (function () {
        function Tile() {
            this.objects = new Array();
        }
        Tile.prototype.addObject = function (object) {
            this.objects.push(object);
        };

        Tile.prototype.removeObject = function (object) {
            for (var i = 0; i < this.objects.length; i++) {
                if (this.objects[i] == object) {
                    delete this.objects[i];
                }
            }
        };

        Tile.prototype.draw = function (context) {
            for (var i = 0; i < this.objects.length; i++) {
                this.objects[i].draw(context);
            }
        };
        return Tile;
    })();
    MainModule.Tile = Tile;
})(MainModule || (MainModule = {}));
