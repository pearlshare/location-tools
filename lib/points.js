var Position = require("./position");
var pointsToRect = require("./util/points_to_rect");
var getDistance = require("./util/get_distance");

/**
 * Manage a set of points
 * @param {Array} points     array to
 * @returns {Points} instance for managing sets of points
 */
function Points (points) {
  if (!Array.isArray(points)) {
    throw new Error("invalid Points constructor arguments, please provide an array: " + points);
  }
  this.points = points.map(function (p) {
    return new Position(p);
  });
  return this;
}

Points.prototype.getRectangle = function () {
  return pointsToRect(this.points);
};

Points.prototype.getCircle = function () {
  return pointsToRect(this.points).toOuterCircle();
};

Points.prototype.getCenter = function () {
  return pointsToRect(this.points).getCenter();
};

Points.prototype.getDistance = function (accuracy) {
  return getDistance(this.points[0], this.points[1], accuracy);
};

module.exports = Points;
