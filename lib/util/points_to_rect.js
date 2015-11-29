var Rectangle = require("../rectangle");

module.exports = function pointsToRect (positions) {
  if (positions.length === 0) {
    return new Rectangle(0, 0, 0, 0);
  } else {
    var lats = positions.map(function (p) {
      return p.lat;
    });
    var lons = positions.map(function (p) {
      return p.lon;
    });

    var minLat = Math.min.apply(Math, lats);
    var minLon = Math.min.apply(Math, lons);
    var maxLat = Math.max.apply(Math, lats);
    var maxLon = Math.max.apply(Math, lons);

    return new Rectangle(maxLat, maxLon, minLat, minLon);
  }
};
