var expect = require("expect.js");
var Position = require("../lib/position");
var Circle = require("../lib/circle");

describe("Circle", function () {

  describe("constructor", function () {

    it("should construct a circle object", function () {
      var circle = new Circle(51, 21, 200);
      expect(circle).to.be.a(Circle);
    });

    it("should have a center and a radius", function () {
      var circle = new Circle(51, 21, 200);
      expect(circle.radius).to.equal(200);
      expect(circle.center.lat).to.equal(51);
      expect(circle.center.lon).to.equal(21);
    });

    it("should construct from a center object and a radius", function () {
      var circle = new Circle(new Position(51, 21), 200);
      expect(circle.radius).to.equal(200);
      expect(circle.center.lat).to.equal(51);
      expect(circle.center.lon).to.equal(21);
    });

    it("should construct from a center array and a radius", function () {
      var circle = new Circle([51, 21], 200);
      expect(circle.radius).to.equal(200);
      expect(circle.center.lat).to.equal(51);
      expect(circle.center.lon).to.equal(21);
    });

  });

  describe("eql", function () {
    it("should return true for matches", function () {
      var circle = new Circle(51, 21, 200);
      expect(circle.eql(circle)).to.be(true);
    });

    it("should return false for differences", function () {
      var circle = new Circle(51, 21, 200);
      var otherCircle = new Circle(51, 33, 200);
      expect(circle.eql(otherCircle)).to.be(false);
    });
  });
});
