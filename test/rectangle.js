var expect = require("expect.js");
var Position = require("../lib/position");
var Rectangle = require("../lib/rectangle");

describe("Rectangle", function () {

  describe("constructor", function () {

    it("should construct from an object", function () {
      var rectangle = new Rectangle({
        n: 51,
        e: 21,
        s: 50,
        w: 20
      });
      expect(rectangle).to.be.a(Rectangle);
      expect(rectangle.n).to.equal(51);
      expect(rectangle.e).to.equal(21);
      expect(rectangle.s).to.equal(50);
      expect(rectangle.w).to.equal(20);
    });

    it("should construct from n, e, s, w args", function () {
      var rectangle = new Rectangle(51, 21, 50, 20);
      expect(rectangle).to.be.a(Rectangle);
      expect(rectangle.n).to.equal(51);
      expect(rectangle.e).to.equal(21);
      expect(rectangle.s).to.equal(50);
      expect(rectangle.w).to.equal(20);
    });

    it("should construct from a ne, sw Position objects", function () {
      var rectangle = new Rectangle(new Position(51, 21), new Position(50, 20));
      expect(rectangle).to.be.a(Rectangle);
      expect(rectangle.n).to.equal(51);
      expect(rectangle.e).to.equal(21);
      expect(rectangle.s).to.equal(50);
      expect(rectangle.w).to.equal(20);
    });

    it("should construct from a couple of location arrays", function () {
      var rectangle = new Rectangle([51, 21], [50, 20]);
      expect(rectangle).to.be.a(Rectangle);
      expect(rectangle.n).to.equal(51);
      expect(rectangle.e).to.equal(21);
      expect(rectangle.s).to.equal(50);
      expect(rectangle.w).to.equal(20);
    });

    it("should construct from a couple of location objects", function () {
      var rectangle = new Rectangle({lat: 51, lon: 21}, {lat: 50, lon: 20});
      expect(rectangle).to.be.a(Rectangle);
      expect(rectangle.n).to.equal(51);
      expect(rectangle.e).to.equal(21);
      expect(rectangle.s).to.equal(50);
      expect(rectangle.w).to.equal(20);
    });

  });

  describe("eql", function () {
    it("should return true for matches", function () {
      var rectangle = new Rectangle(51, 21, 50, 20);
      expect(rectangle.eql(rectangle)).to.be(true);
    });

    it("should return false for differences", function () {
      var rectangle = new Rectangle(51, 21, 50, 20);
      var otherRectangle = new Rectangle(51, 21, 33, 33);
      expect(rectangle.eql(otherRectangle)).to.be(false);
    });
  });

  describe("ne", function () {
    it("should return a Position", function () {
      var rectangle = new Rectangle(51, 21, 50, 20);
      expect(rectangle.ne.eql(51, 21)).to.be(true);
    });
  });

  describe("nw", function () {
    it("should return a Position", function () {
      var rectangle = new Rectangle(51, 21, 50, 20);
      expect(rectangle.nw.eql(51, 20)).to.be(true);
    });
  });

  describe("se", function () {
    it("should return a Position", function () {
      var rectangle = new Rectangle(51, 21, 50, 20);
      expect(rectangle.se.eql(50, 21)).to.be(true);
    });
  });

  describe("sw", function () {
    it("should return a Position", function () {
      var rectangle = new Rectangle(51, 21, 50, 20);
      expect(rectangle.sw.eql(50, 20)).to.be(true);
    });
  });

  describe("toArray()", function () {
    it("should return an array of arrays", function () {
      var rectangle = new Rectangle(51, 21, 50, 20);
      expect(rectangle.toArray()).to.eql([[50, 20], [51, 21]]);
    });
  });
});
