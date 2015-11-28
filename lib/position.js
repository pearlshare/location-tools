/**
 * Tools for creating and comparing positions
 * @param {Number}    lat      latitude
 * @param {Number}    lon      longitude
 * @returns {Rectangle} rectangle
 */
function Position (lat, lon) {
  var loc = {};
  if (lon) {
    loc.lat = lat;
    loc.lon = lon;
  }
  else if (lat.constructor === Position) {
    loc.lat = lat.lat;
    loc.lon = lat.lon;
  }
  else if (Array.isArray(lat)) {
    loc.lat = lat[0];
    loc.lon = lat[1];
  }
  else if (typeof lat === "object") {
    loc.lat = lat.lat;
    loc.lon = lat.lon;
  }
  this.lat = +parseFloat(loc.lat).toFixed(12);
  this.lon = +parseFloat(loc.lon).toFixed(12);
  return this;
}

Position.prototype.eql = function (lat, lon) {
  var pos = new Position(lat, lon);
  return this.lat === pos.lat &&
         this.lon === pos.lon;
};

Position.prototype.toArray = function () {
  return [this.lat, this.lon];
};

module.exports = Position;
