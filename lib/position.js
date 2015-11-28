/**
 * Tools for creating and comparing positions
 * @returns {Rectangle} rectangle
 */
function Position () {
  var args = Array.prototype.slice.call(arguments);
  var loc = {};
  if (args.length === 2) {
    loc.lat = args[0];
    loc.lon = args[1];
  } else if (args.length === 1) {
    if (args[0].constructor === Position) {
      loc.lat = args[0].lat;
      loc.lon = args[0].lon;
    } else if (Array.isArray(args[0])) {
      loc.lat = args[0][0];
      loc.lon = args[0][1];
    } else if (typeof args[0] === "object") {
      loc.lat = args[0].lat;
      loc.lon = args[0].lon;
    }
  }

  this.lat = +parseFloat(loc.lat).toFixed(12);
  this.lon = +parseFloat(loc.lon).toFixed(12);
  return this;
}

Position.prototype.eql = function () {
  var obj = Object.create(Position.prototype);
  var pos = Position.apply(obj, arguments);
  return this.lat === pos.lat &&
         this.lon === pos.lon;
};

Position.prototype.toArray = function () {
  return [this.lat, this.lon];
};

module.exports = Position;
