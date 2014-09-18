//var Wall = GameObject.extend(
//{
//	init: function(x, y, size) {
//		this.parent();
//
//		this.x = x;
//		this.y = y;
//		this.size = size;
//	},
//
//	draw: function(context) {
//		context.beginPath();
//		context.fillStyle = "blue";
//		context.fillRect(this.x, this.y, this.size, this.size);
//		context.fill();
//	}
//
//});
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MainModule;
(function (MainModule) {
    var Wall = (function (_super) {
        __extends(Wall, _super);
        function Wall(x, y, size) {
            _super.call(this);
            this.x = x;
            this.y = y;
            this.size = size;
        }
        Wall.prototype.draw = function (context) {
            context.beginPath();
            context.fillStyle = "blue";
            context.fillRect(this.x, this.y, this.size, this.size);
        };
        return Wall;
    })(MainModule.GameObject);
    MainModule.Wall = Wall;
})(MainModule || (MainModule = {}));
