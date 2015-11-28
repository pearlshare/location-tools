var Position = require("./position");

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
  this.ne = new Position(this.n, this.e);
  this.nw = new Position(this.n, this.w);
  this.se = new Position(this.s, this.e);
  this.sw = new Position(this.s, this.w);
  return this;
}

Rectangle.prototype.eql = function () {
  var obj = Object.create(Rectangle.prototype);
  var rect = Rectangle.apply(obj, arguments);
  return this.n === rect.n &&
         this.e === rect.e &&
         this.s === rect.s &&
         this.w === rect.w;
};

Rectangle.prototype.toArray = function () {
  return [this.sw.toArray(), this.ne.toArray()];
};

module.exports = Rectangle;
