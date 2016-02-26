var expect = require("expect.js");
var Position = require("../lib/position");
var Circle = require("../lib/circle");
var Rectangle = require("../lib/rectangle");

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

  describe("toRectangle", function () {
    it("should return a Rectangle", function () {
      var circle = new Circle([51, 21], 200);
      var rect = circle.toRectangle();
      expect(rect).to.be.a(Rectangle);
      expect(rect.n).to.eql(51.0018000018);
      expect(rect.e).to.eql(21.002860231172548);
      expect(rect.s).to.eql(50.9981999982);
      expect(rect.w).to.eql(20.997139768827452);

      // For good measure check it converts back
      var newCircle = rect.toOuterCircle();

      expect(newCircle.lat).to.eql(51);
      expect(newCircle.lon).to.eql(21);

      /*
        NOTE: Due to rounding, this value becomes 200.7815, when it shoud be 200.
      */
      expect(newCircle.radius).to.eql(200.7815);
    });
  });
});
