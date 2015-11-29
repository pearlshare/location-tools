module.exports = function checkValue (val) {
  return val !== undefined && val !== null && !isNaN(val);
};
