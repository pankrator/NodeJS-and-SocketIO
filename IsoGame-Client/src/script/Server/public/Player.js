var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MainModule;
(function (MainModule) {
    (function (PlayerStates) {
        PlayerStates[PlayerStates["Idle"] = 0] = "Idle";
        PlayerStates[PlayerStates["Walking"] = 1] = "Walking";
    })(MainModule.PlayerStates || (MainModule.PlayerStates = {}));
    var PlayerStates = MainModule.PlayerStates;

    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(name, x, y, size, stateMachine) {
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
            this.stateMachine = stateMachine;

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

            var iso = MainModule.Renderer.screenToIso(this.x, this.y);
            context.drawImage(images[this.direction], frameWidth * this.animationFrame, 0, frameWidth, frameHeight, iso[0], iso[1], frameWidth, frameHeight);
        };

        Player.prototype.update = function () {
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
