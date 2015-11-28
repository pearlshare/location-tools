var expect = require("expect.js");
var Points = require("../lib/points");

describe("Points", function () {

  describe("constructor", function () {
    it("should construct a Points object", function () {
      var points = new Points(["51,21", "45,15"]);
      expect(points).to.be.a(Points);
    });

    it("should calculate a center", function () {
      var points = new Points(["40,20", "50,10"]);
      expect(points.center.eql("45,15")).to.be(true);
    });

    it("should calculate a circle", function () {
      var points = new Points(["40,20", "50,10"]);
      expect(points.circle.eql("45,15", 787967)).to.be(true);
    });

    it("should calculate a rectangle", function () {
      var points = new Points(["40,20", "50,10"]);
      expect(points.rectangle.eql(50, 20, 40, 10)).to.be(true);
    });

  });
});
