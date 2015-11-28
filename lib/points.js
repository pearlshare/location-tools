var Circle = require("./circle");
var Position = require("./position");
var Rectangle = require("./rectangle");

/**
 * Manage a set of points
 * @param {Array} points     array to
 * @returns {Points} instance for managing sets of points
 */
function Points (points) {
  this.points = points.map(function (p) {
    return new Position(p);
  });
  var center = this.getCenter();
  this.circle = center.circle;
  this.rectangle = center.rectangle;
  this.center = center.position;
  return this;
}

Points.prototype.getCenter = function () {
  var lats = this.points.map(function (p) {
    return p.lat;
  });
  var lons = this.points.map(function (p) {
    return p.lon;
  });

  var minLat = Math.min.apply(Math, lats);
  var minLon = Math.min.apply(Math, lons);
  var maxLat = Math.max.apply(Math, lats);
  var maxLon = Math.max.apply(Math, lons);

  var lat = minLat + (maxLat - minLat) / 2;
  var lon = minLon + (maxLon - minLon) / 2;
  var radius = Math.sqrt(Math.pow(minLat, 2) + Math.pow(maxLat, 2)) / 2;

  return {
    circle: new Circle(lat, lon, radius),
    rectangle: new Rectangle(maxLat, maxLon, minLat, minLon),
    Position: new Position(lat, lon)
  };

};

module.exports = Points;
