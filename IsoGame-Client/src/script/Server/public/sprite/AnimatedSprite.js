var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MainModule;
(function (MainModule) {
    var AnimatedSprite = (function (_super) {
        __extends(AnimatedSprite, _super);
        function AnimatedSprite(sources, width, height, frameWidth, frameHeight) {
            _super.call(this, sources, width, height);
            this.frameWidth = frameWidth;
            this.frameHeight = frameHeight;
            this.numberOfFrames = this.width / this.frameWidth;
            this.currentFrame = 0;
            this.frameCount = 0;
        }
        AnimatedSprite.prototype.getCurrentFrame = function () {
            return this.currentFrame;
        };

        AnimatedSprite.prototype.getAnimationImage = function () {
            //TODO: Return the image according to State
            return this.images[0];
        };

        AnimatedSprite.prototype.updateAnimation = function () {
            if (++this.frameCount > 30) {
                this.frameCount = 0;
                this.currentFrame++;
            }
        };
        return AnimatedSprite;
    })(MainModule.Sprite);
    MainModule.AnimatedSprite = AnimatedSprite;
})(MainModule || (MainModule = {}));
