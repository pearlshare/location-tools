var expect = require("expect.js");
var Position = require("../lib/position");

describe("Position", function () {

  describe("constructor", function () {

    it("should construct a position object", function () {
      var position = new Position(51, 21);
      expect(position).to.be.a(Position);
    });

    it("should construct from string lat lon", function () {
      var position = new Position("51", "21");
      expect(position.lat).to.be.a("number").and.to.equal(51);
      expect(position.lon).to.be.a("number").and.to.equal(21);
    });

    it("should convert [lat, lon] into a position", function () {
      var position = new Position([51, 21]);
      expect(position.lat).to.be.a("number").and.to.equal(51);
      expect(position.lon).to.be.a("number").and.to.equal(21);
    });

    it("should convert {lat: 51, lon: 21} into a position", function () {
      var position = new Position({lat: 51, lon: 21});
      expect(position.lat).to.be.a("number").and.to.equal(51);
      expect(position.lon).to.be.a("number").and.to.equal(21);
    });

  });

  describe("eql", function () {
    var position = new Position(51, 21);

    it("should find the same point equal", function () {
      expect(position.eql(position)).to.be(true);
      expect(position.eql(new Position(51, 21))).to.be(true);
      expect(position.eql(51, 21)).to.be(true);
      expect(position.eql([51, 21])).to.be(true);
      expect(position.eql({lat: 51, lon: 21})).to.be(true);
    });

    it("should find different values unequal", function () {
      expect(position.eql(new Position(51, 33))).to.be(false);
      expect(position.eql(51, 33)).to.be(false);
      expect(position.eql(33, 21)).to.be(false);
      expect(position.eql([33, 21])).to.be(false);
      expect(position.eql({lat: 33, lon: 21})).to.be(false);
    });
  });

  describe("toArray", function () {
    var position = new Position(51, 21);

    it("should return an array", function () {
      expect(position.toArray())
        .to.be.an("array")
        .and.to.eql([51, 21]);
    });
  });
});
