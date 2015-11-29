var Position = require("./position");
var getDistance = require("./util/get_distance");
var checkValue = require("./util/check_value");

/**
 * Tools for creating and comparing rectangular geobounds
 * @returns {Rectangle} rectangle
 */
function Rectangle () {
  var args = Array.prototype.slice.call(arguments);
  var coords;
  if (args.length === 4) {
    // Rectangle(n, e, s, w)
    coords = {
      n: args[0],
      e: args[1],
      s: args[2],
      w: args[3]
    };
  } else if (args.length === 2) {
    if (Array.isArray(args[0])) {
      // Rectangle([s, w], [n, e])
      coords = {
        n: args[1][0],
        e: args[1][1],
        s: args[0][0],
        w: args[0][1]
      };
    } else if (args[0].constructor === Position || typeof args[0] === "object") {
      // Rectangle({lat: s, lon: w}, {lat: n, lon: e})
      coords = {
        n: args[1].lat,
        e: args[1].lon,
        s: args[0].lat,
        w: args[0].lon
      };
    }
  } else if (args.length === 1) {
    if (Array.isArray(args[0])) {

      if (args[0].length === 2) {
        // Rectangle([[s, w], [n ,e]])
        coords = {
          n: args[0][1][0],
          e: args[0][1][1],
          s: args[0][0][0],
          w: args[0][0][1]
        };
      } else {
        // Rectangle([n ,e, s, w])
        coords = {
          n: args[0][0],
          e: args[0][1],
          s: args[0][2],
          w: args[0][3]
        };
      }

    } else if (typeof args[0] === "object") {
      // Rectangle({n: n ,e: e, s: s, w: w})
      coords = {
        n: args[0].n,
        e: args[0].e,
        s: args[0].s,
        w: args[0].w
      };
    }
  }
  if (!checkValue(coords.n) || !checkValue(coords.e) || !checkValue(coords.s) || !checkValue(coords.w)) {
    throw new Error("invalid Rectangle constructor arguments: " + args);
  }
  this.n = +parseFloat(coords.n).toFixed(17);
  this.e = +parseFloat(coords.e).toFixed(17);
  this.s = +parseFloat(coords.s).toFixed(17);
  this.w = +parseFloat(coords.w).toFixed(17);
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
  var bounds = this.getBounds();
  return {
    height: getDistance(bounds.n, bounds.s),
    width: getDistance(bounds.e, bounds.w)
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
  var bounds = this.getBounds();
  return [bounds.sw.toArray(), bounds.ne.toArray()];
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
  var Circle = require("./circle"); // FIXME - circular reference
  var dimensions = this.getDimensions();
  // Radius is min of width or height / 2
  var diameter = dimensions.height > dimensions.width ? dimensions.width : dimensions.height;

  var center = this.getCenter();
  return new Circle({
    lat: center.lat,
    lon: center.lon,
    radius: diameter / 2
  });
};

module.exports = Rectangle;
