var MainModule;
(function (MainModule) {
    var NetworkView = (function () {
        function NetworkView(target, socket, context, id) {
            var _this = this;
            this.updateTarget = function (data) {
                _this.target.updateState(data);
            };
            this.update = function () {
                var data = new Array();
                var dirty = false;
                for (var i = 0; i < _this.properties.length; i++) {
                    if (_this.target[_this.properties[i].name] != _this.properties[i].value) {
                        _this.properties[i].value = _this.target[_this.properties[i].name];
                        data.push(_this.properties[i]);
                        dirty = true;
                    }
                }
                if (dirty) {
                    //				data.push({name: "id", value: this.socket.io.engine.id});
                    _this.socket.emit("update" + _this.updateContext, { id: _this.id, data: data });
                }
                if (_this.target != null) {
                    window.setTimeout(_this.update, 100);
                }
            };
            this.target = target;
            this.socket = socket;
            this.properties = new Array();
            this.updateContext = context;
            this.id = id;

            for (var prop in target) {
                if (!(target[prop] instanceof Function)) {
                    this.properties.push({ name: prop, value: target[prop] });
                }
            }
            console.log("Registered: " + "update" + this.updateContext + this.id);
            this.socket.on("update" + this.updateContext + this.id, this.updateTarget);
            //window.setTimeout(this.update, 100);
        }
        return NetworkView;
    })();
    MainModule.NetworkView = NetworkView;
})(MainModule || (MainModule = {}));
