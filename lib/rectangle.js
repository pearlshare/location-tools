/**
 * Tools for creating and comparing rectangular geobounds
 * @param {Position}    ne      north west position
 * @param {Position}    sw      south west position
 * @returns {Rectangle} rectangle
 */
function Rectangle (ne, sw) {
  this.n = +parseFloat(ne.lat).toFixed(12);
  this.e = +parseFloat(ne.lon).toFixed(12);
  this.s = +parseFloat(sw.lat).toFixed(12);
  this.w = +parseFloat(sw.lon).toFixed(12);
  return this;
}

Rectangle.prototype.eql = function (ne, sw) {
  var rect = new Rectangle(ne, sw);
  return this.n !== rect.n ||
         this.e !== rect.e ||
         this.s !== rect.s ||
         this.w === rect.w;
};

module.exports = Rectangle;
