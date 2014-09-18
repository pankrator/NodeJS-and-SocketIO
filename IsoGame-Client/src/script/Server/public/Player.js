var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MainModule;
(function (MainModule) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(name, x, y, size) {
            var _this = this;
            _super.call(this, x, y, size);
            this.updateAnimationFrame = function () {
                _this.animationFrame++;
                if (_this.animationFrame > 14) {
                    _this.animationFrame = 0;
                }
                setTimeout(_this.updateAnimationFrame, 100);
            };
            this.name = name;
            this.animationFrame = 5;
            this.direction = 0;

            this.updateAnimationFrame();
        }
        Player.prototype.draw = function (context) {
            context.beginPath();

            var images = new Array();

            var img = new Image();
            img.src = "resources/Farmer/Walk/Farmer_Walk_Right.png";
            images.push(img);

            img = new Image();
            img.src = "resources/Farmer/Walk/Farmer_Walk_Up.png";
            images.push(img);

            img = new Image();
            img.src = "resources/Farmer/Walk/Farmer_Walk_Left.png";
            images.push(img);

            img = new Image();
            img.src = "resources/Farmer/Walk/Farmer_Walk_Down.png";
            images.push(img);

            var frameWidth = images[this.direction].width / 15;
            var frameHeight = images[this.direction].height;
            context.drawImage(images[this.direction], frameWidth * this.animationFrame, 0, frameWidth, frameHeight, this.x, this.y, frameWidth, frameHeight);
            context.rect(this.x, this.y, 5, 5);
            context.fill();
        };

        Player.prototype.update = function () {
            this.move();
        };

        Player.prototype.move = function () {
            if (MainModule.App.inputManager.keys[KEYS.LEFT_ARROW]) {
                this.direction = 2;
                this.x -= 2;
            }
            if (MainModule.App.inputManager.keys[KEYS.UP_ARROW]) {
                this.direction = 1;
                this.y -= 2;
            }
            if (MainModule.App.inputManager.keys[KEYS.RIGHT_ARROW]) {
                this.direction = 0;
                this.x += 2;
            }
            if (MainModule.App.inputManager.keys[KEYS.DOWN_ARROW]) {
                this.direction = 3;
                this.y += 2;
            }
        };

        Player.prototype.updateState = function (data) {
            for (var i = 0; i < data.length; i++) {
                this[data[i].name] = data[i].value;
            }
        };
        return Player;
    })(MainModule.Entity);
    MainModule.Player = Player;
})(MainModule || (MainModule = {}));
