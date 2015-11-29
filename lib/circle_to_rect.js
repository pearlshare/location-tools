
function toRad (val) {
  return val * Math.PI / 180;
}

/**
 * Find the rectangular bounds given a point and a radius
 *
 * http://gis.stackexchange.com/questions/2951/algorithm-for-offsetting-a-latitude-longitude-by-some-amount-of-meters
 * If your displacements aren't too great (less than a few kilometers) and
 * you're not right at the poles, use the quick and dirty estimate that
 * 111,111 meters (111.111 km) in the y direction is 1 degree (of latitude)
 * and 111,111 * cos(latitude) meters in the x direction is 1 degree (of longitude).
 *
 * @param {Position} center    central point to calculate bounds around
 * @param {Number}   radius    radius to extend to find bounds
 * @returns {Object} nesw object
 */
module.exports = function getBoundsFromCenterAndRadius (center, radius) {
  var latScalar = 111111;
  var latitudeAdjust = radius / latScalar;
  var lonScalar = latScalar * Math.cos(toRad(center.lat));
  var longitudeAdjust = radius / lonScalar;
  return {
    n: center.lat + latitudeAdjust,
    e: center.lon + longitudeAdjust,
    s: center.lat - latitudeAdjust,
    w: center.lon - longitudeAdjust
  };
};
