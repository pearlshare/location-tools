var Position = require("./position");
var circleToRect = require("./util/circle_to_rect");
var checkValue = require("./util/check_value");

/**
 * Tools for creating and comparing circular geobounds
 * @returns {Rectangle} rectangle
 */
function Circle () {
  var args = Array.prototype.slice.call(arguments);

  if (args.length === 3) {
    this.center = new Position(args[0], args[1]);
    this.radius = parseInt(args[2]);
  } else if (args.length === 2) {
    this.center = new Position(args[0]);
    this.radius = parseInt(args[1]);
  } else if (args.length === 1) {
    this.center = new Position(args[0].lat, args[0].lon);
    this.radius = args[0].radius;
  }
  if (!this.center || !checkValue(this.radius)) {
    throw new Error("invalid Circle constructor arguments" + args);
  }
  this.lat = this.center.lat;
  this.lon = this.center.lon;
  return this;
}

Circle.prototype.eql = function () {
  var obj = Object.create(Circle.prototype);
  var circle = Circle.apply(obj, arguments);
  return this.lat === circle.lat &&
         this.lon === circle.lon &&
         this.radius === circle.radius;
};

Circle.prototype.toObject = function () {
  return {
    lat: this.lat,
    lon: this.lon,
    radius: this.radius
  };
};

Circle.prototype.toRectangle = function () {
  var Rectangle = require("./rectangle");  // FIXME - circular reference
  var bounds = circleToRect(this.center, this.radius);
  return new Rectangle(bounds);
};

module.exports = Circle;
