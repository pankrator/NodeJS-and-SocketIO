var MainModule;
(function (MainModule) {
    var Sprite = (function () {
        function Sprite(sources, width, height) {
            this.width = width;
            this.height = height;
            for (var i = 0; i < sources.length; i++) {
                var img = new Image();
                img.src = sources[i];
                this.images.push(img);
            }
        }
        Sprite.prototype.getImage = function () {
            return this.images[0];
        };
        return Sprite;
    })();
    MainModule.Sprite = Sprite;
})(MainModule || (MainModule = {}));
