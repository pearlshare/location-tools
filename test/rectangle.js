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

  describe("bounds", function () {
    var rectangle = new Rectangle(51, 21, 50, 20);

    it("should have a ne", function () {
      expect(rectangle.bounds.ne.eql(51, 21)).to.be(true);
    });

    it("should have a nw", function () {
      expect(rectangle.bounds.nw.eql(51, 20)).to.be(true);
    });

    it("should have a se", function () {
      expect(rectangle.bounds.se.eql(50, 21)).to.be(true);
    });

    it("should have a sw", function () {
      expect(rectangle.bounds.sw.eql(50, 20)).to.be(true);
    });

    it("should have a n", function () {
      expect(rectangle.bounds.n.eql(51, 20.5)).to.be(true);
    });

    it("should have a e", function () {
      expect(rectangle.bounds.e.eql(50.5, 21)).to.be(true);
    });

    it("should have a s", function () {
      expect(rectangle.bounds.s.eql(50, 20.5)).to.be(true);
    });

    it("should have a w", function () {
      expect(rectangle.bounds.w.eql(50.5, 20)).to.be(true);
    });
  });

  describe("toArray()", function () {
    it("should return an array of arrays", function () {
      var rectangle = new Rectangle(51, 21, 50, 20);
      expect(rectangle.toArray()).to.eql([[50, 20], [51, 21]]);
    });
  });

  describe("toCircle()", function () {
    it("should return a Circle instance", function () {
      var rectangle = new Rectangle(51, 21, 50, 20);
      var circle = rectangle.toCircle();
      expect(circle.center.eql(new Position(50.5, 20.5))).to.be(true);
      expect(circle.radius).to.eql(55619.5);
    });
  });

  describe("toObject()", function () {
    it("should return a plain object with NESW values", function () {
      var rectangle = new Rectangle(51, 21, 50, 20);
      expect(rectangle.toObject()).to.eql({
        n: 51,
        e: 21,
        s: 50,
        w: 20
      });
    });
  });
});
