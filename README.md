# Location tools

A small set of tools to manage coordinates. This is useful for controlling maps and pins.

## Usage

### Position

A position is a point referenced via lat/lon. Positions can be created by providing lat lon via:

* arguments: lat, lon
* array: [lat, lon]
* object: {lat: yy, lon: xx}

```js
var lt = require("location-tools");

var pos1 = lt.Position(52, 21);
assert(pos1.lat === 52);
assert(pos1.lon === 21);

var pos2 = lt.Position(45, 15);
assert(pos2.lat === 45);
assert(pos2.lon === 15);

assert(pos1.eql(pos2));
```

### Circle

A circle is a circular area referenced via the center lat/lon and a radius. Positions can be created by providing any position arguments for the lat lon and the radius (in meters).

```js
var lt = require("location-tools");

var circle1 = lt.Circle(52, 21, 200);
assert(circle1.lat === 52);
assert(circle1.lon === 21);
assert(circle1.radius === 200);

var circle2 = lt.Circle(45, 15, 2000);
assert(circle2.lat === 45);
assert(circle2.lon === 15);
assert(circle2.lon === 2000);

assert(!circle1.eql(circle2));
```

### Rectangle

A rectangle is defined by 4 bounds - north, east, south, west. The rectangle provides easy access to NE, SE, SW and NW positions.

```js
var lt = require("location-tools");

var rectangle1 = lt.Rectangle(52, 21, 50, 20);
assert(rectangle1.ne === 52);
assert(rectangle1.lon === 21);
assert(rectangle1.eql(reactangle1));

var rectangle2 = lt.Rectangle(45, 15, 49, 19);
assert(rectangle2.lat === 45);
assert(rectangle2.lon === 15);

assert(!rectangle1.eql(rectangle2));
```

### Points

Insert multiple positions and get useful information back out such as bounds, center and radius.

```js
var lt = require("location-tools");

var points = new Points(["52, 0", "50, 2"]);

assert(points.points[0].eql("52, 0"));
assert(points.points[1].eql("50, 2"));
assert(points.circle.eql([51, 1], 140391));
assert(points.center.eql([51, 1]));
assert(points.rectangle.eql(52, 2, 0, 50));
```


