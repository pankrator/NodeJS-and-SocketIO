/**	2D Vector implementation.	Basic vector operations**/
var Vector = function (x, y) {
    this.x = x;
    this.y = y;
};

Vector.prototype.add = function (v) {
    this.x += v.x;
    this.y += v.y;
};

Vector.prototype.mult = function (s) {
    this.x *= s;
    this.y *= s;
};

Vector.prototype.get = function () {
    return new Vector(this.x, this.y);
};

Vector.prototype.len = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.lenSqr = function () {
    return this.x * this.x + this.y * this.y;
};

Vector.prototype.limit = function (amount) {
    var len = this.lenSqr();

    if (len > amount * amount && len > 0) {
        var ration = amount / Math.sqrt(len);
        this.x *= ration;
        this.y *= ration;
    }
};

Vector.prototype.normalize = function () {
    var vlen = this.len();
    if (vlen == 0)
        return;
    this.x /= vlen;
    this.y /= vlen;
};
