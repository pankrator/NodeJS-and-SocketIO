/*
* some "Javascript API" patch & enhancement
*/

var initializing = false, fnTest = /var xyz/.test(function () {
	/** @nosideeffects */
	/* jshint ignore:start */
	var xyz;
	/* jshint ignore:end */
}) ? /\bparent\b/ : /[\D|\d]*/;

Object.extend = function (prop) {
        // _super rename to parent to ease code reading
        var parent = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var proto = new this();
        initializing = false;

        function addSuper(name, fn) {
            return function () {
                var tmp = this.parent;

                // Add a new ._super() method that is the same method
                // but on the super-class
                this.parent = parent[name];

                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                var ret = fn.apply(this, arguments);
                this.parent = tmp;

                return ret;
            };
        }

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            if (prop.hasOwnProperty(name)) {
                // Check if we're overwriting an existing function
                proto[name] = (
                    typeof prop[name] === "function" &&
                    typeof parent[name] === "function" &&
                    fnTest.test(prop[name])
                ) ? addSuper(name, prop[name]) : prop[name];
            }
        }

        // The dummy class constructor
        function Class() {
            if (!initializing) {
                /* jshint ignore:start */
                for (var prop in this) {
                    // deepcopy properties if required
                    if (typeof(this[prop]) === "object") {
                        this[prop] = deepcopy(this[prop]);
                    }
                }
                /* jshint ignore:end */
                if (this.init) {
                    this.init.apply(this, arguments);
                }
            }
            return this;
        }
        // Populate our constructed prototype object
        Class.prototype = proto;
        // Enforce the constructor to be what we expect
        Class.constructor = Class;
        // And make this class extendable
        Class.extend = Object.extend;//arguments.callee;

        return Class;
    };

    if (typeof Object.create !== "function") {
        /**
* Prototypal Inheritance Create Helper
* @name create
* @memberOf external:Object#
* @function
* @param {Object} Object
* @example
* // declare oldObject
* oldObject = new Object();
* // make some crazy stuff with oldObject (adding functions, etc...)
* ...
* ...
*
* // make newObject inherits from oldObject
* newObject = Object.create(oldObject);
*/
	Object.create = function (o) {
		var Fn = function () {};
		Fn.prototype = o;
		return new Fn();
	};
}