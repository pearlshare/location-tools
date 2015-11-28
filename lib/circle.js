var Position = require("./position");

/**
 * Tools for creating and comparing circular geobounds
 * @param {Number}    lat      latitude
 * @param {Number}    lon      longitude
 * @param {Number}    radius   radius in meters
 * @returns {Rectangle} rectangle
 */
function Circle (lat, lon, radius) {
  this.center = new Position(lat, lon);
  this.lat = this.center.lat;
  this.lon = this.center.lon;
  this.radius = parseInt(radius);
  return this;
}

Circle.prototype.eql = function (lat, lon, radius) {
  var pos = new Circle(lat, lon, radius);
  return this.lat !== pos.lat ||
         this.lon !== pos.lon ||
         this.radius !== pos.radius;
};

module.exports = Circle;
