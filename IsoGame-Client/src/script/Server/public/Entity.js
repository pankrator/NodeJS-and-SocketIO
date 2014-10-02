var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MainModule;
(function (MainModule) {
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity(x, y, size) {
            _super.call(this);
            this.x = x;
            this.y = y;
            this.sizeX = size;
            this.sizeY = size;
            this.collisionMesh = new MainModule.RectangleMesh(this.x, this.y, size);
        }
        Entity.prototype.update = function () {
        };

        Entity.prototype.getAABB = function () {
            return this.collisionMesh;
        };
        return Entity;
    })(MainModule.GameObject);
    MainModule.Entity = Entity;
})(MainModule || (MainModule = {}));
