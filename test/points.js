var expect = require("expect.js");
var Points = require("../lib/points");
var Rectangle = require("../lib/rectangle");

describe("Points", function () {

  describe("constructor", function () {
    it("should construct a Points object", function () {
      var points = new Points(["51,21", "45,15"]);
      expect(points).to.be.a(Points);
    });

    it("should construct a Points object from an empty array", function () {
      var points = new Points([]);
      expect(points).to.be.a(Points);
    });
  });

  describe("getRectangle", function () {
    it("should return a Rectangle", function () {
      var points = new Points(["51,21", "45,15"]);
      expect(points.getRectangle()).to.be.a(Rectangle);
    });

    it("should calculate a rectangle", function () {
      var points = new Points(["40,20", "50,10"]);
      expect(points.getRectangle().eql(50, 20, 40, 10)).to.be(true);
    });

    it("should handle an empty array input", function () {
      var points = new Points([]);
      expect(points.getRectangle().eql(0, 0, 0, 0)).to.be(true);
    });
  });

  describe("getCenter", function () {
    it("should calculate a center", function () {
      var points = new Points(["40,20", "50,10"]);
      expect(points.getCenter().eql("45,15")).to.be(true);
    });
  });

  describe("getCircle", function () {
    it("should calculate a circle", function () {
      var points = new Points(["40,20", "50,10"]);
      expect(points.getCircle().eql("45,15", 555659)).to.be(true);
    });
  });
});
