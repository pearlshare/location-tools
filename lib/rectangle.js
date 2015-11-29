var Position = require("./position");
var getDistance = require("./get_distance");
var Circle = require("./circle");

/**
 * Tools for creating and comparing rectangular geobounds
 * @returns {Rectangle} rectangle
 */
function Rectangle () {
  var args = Array.prototype.slice.call(arguments);
  var coords;
  if (args.length === 4) {
    coords = {
      n: args[0],
      e: args[1],
      s: args[2],
      w: args[3]
    };
  } else if (args.length === 2) {
    if (Array.isArray(args[0])) {
      coords = {
        n: args[0][0],
        e: args[0][1],
        s: args[1][0],
        w: args[1][1]
      };
    } else if (args[0].constructor === Position || typeof args[0] === "object") {
      coords = {
        n: args[0].lat,
        e: args[0].lon,
        s: args[1].lat,
        w: args[1].lon
      };
    }
  } else if (args.length === 1) {
    if (Array.isArray(args[0])) {
      coords = {
        n: args[0][0],
        e: args[0][1],
        s: args[0][2],
        w: args[0][3]
      };

    } else if (typeof args[0] === "object") {
      coords = {
        n: args[0].n,
        e: args[0].e,
        s: args[0].s,
        w: args[0].w
      };
    }
  }
  this.n = +parseFloat(coords.n).toFixed(12);
  this.e = +parseFloat(coords.e).toFixed(12);
  this.s = +parseFloat(coords.s).toFixed(12);
  this.w = +parseFloat(coords.w).toFixed(12);
  this.bounds = this.getBounds();
  this.center = this.getCenter();
  return this;
}

Rectangle.prototype.getBounds = function () {
  var midLat = this.s + (this.n - this.s) / 2;
  var midLon = this.w + (this.e - this.w) / 2;
  return {
    ne: new Position(this.n, this.e),
    nw: new Position(this.n, this.w),
    se: new Position(this.s, this.e),
    sw: new Position(this.s, this.w),
    n: new Position(this.n, midLon),
    e: new Position(midLat, this.e),
    s: new Position(this.s, midLon),
    w: new Position(midLat, this.w)
  };
};

Rectangle.prototype.getCenter = function () {
  var latCenter = this.s + (this.n - this.s) / 2;
  var lonCenter = this.w + (this.e - this.w) / 2;
  return new Position(latCenter, lonCenter);
};

Rectangle.prototype.getDimensions = function () {
  return {
    height: getDistance(this.bounds.n, this.bounds.s),
    width: getDistance(this.bounds.e, this.bounds.w)
  };
};

Rectangle.prototype.eql = function () {
  var obj = Object.create(Rectangle.prototype);
  var rect = Rectangle.apply(obj, arguments);
  return this.n === rect.n &&
         this.e === rect.e &&
         this.s === rect.s &&
         this.w === rect.w;
};

Rectangle.prototype.toArray = function () {
  return [this.bounds.sw.toArray(), this.bounds.ne.toArray()];
};

Rectangle.prototype.toObject = function () {
  return {
    n: this.n,
    e: this.e,
    s: this.s,
    w: this.w
  };
};

Rectangle.prototype.toCircle = function () {
  var width = (this.e - this.w);
  var height = (this.n - this.s);
  // Radius is min of width or height / 2
  var radius = height > width ? getDistance(this.bounds.w, this.bounds.e) / 2 : getDistance(this.bounds.n, this.bounds.s) / 2;

  return new Circle({
    lat: this.center.lat,
    lon: this.center.lon,
    radius: radius
  });
};

module.exports = Rectangle;
