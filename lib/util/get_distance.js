
function toRad (val) {
  return val * Math.PI / 180;
}

/**
* Calculates geodetic distance between two points specified by latitude/longitude using
* [Imported and modified from geolib]
* Vincenty inverse formula for ellipsoids
* Vincenty Inverse Solution of Geodesics on the Ellipsoid (c) Chris Veness 2002-2010
* (Licensed under CC BY 3.0)
*
* @param    {object}   start      Start position
* @param    {object}   end        End position
* @param    {integer}  accuracy   Accuracy (in meters)
* @returns   {integer} Distance (in meters)
*/
module.exports = function getDistance (start, end, accuracy) {

    accuracy = Math.floor(accuracy) || 1;

    var a = 6378137, b = 6356752.314245,  f = 1 / 298.257223563;  // WGS-84 ellipsoid params
    var L = toRad(end.lon - start.lon);

    var cosSigma, sigma, sinAlpha, cosSqAlpha, cos2SigmaM, sinSigma;

    var U1 = Math.atan((1 - f) * Math.tan(toRad(parseFloat(start.lat))));
    var U2 = Math.atan((1 - f) * Math.tan(toRad(parseFloat(end.lat))));
    var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
    var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);

    var lambda = L, lambdaP, iterLimit = 100;
    do {
        var sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
        sinSigma = (
            Math.sqrt(
                (
                    cosU2 * sinLambda
                ) * (
                    cosU2 * sinLambda
                ) + (
                    cosU1 * sinU2 - sinU1 * cosU2 * cosLambda
                ) * (
                    cosU1 * sinU2 - sinU1 * cosU2 * cosLambda
                )
            )
        );

        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        sigma = Math.atan2(sinSigma, cosSigma);
        sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
        cosSqAlpha = 1 - sinAlpha * sinAlpha;
        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;

        if (isNaN(cos2SigmaM)) {
            cos2SigmaM = 0;  // equatorial line: cosSqAlpha=0 (§6)
        }
        var C = (
            f / 16 * cosSqAlpha * (
                4 + f * (
                    4 - 3 * cosSqAlpha
                )
            )
        );
        lambdaP = lambda;
        lambda = (
            L + (
                1 - C
            ) * f * sinAlpha * (
                sigma + C * sinSigma * (
                    cos2SigmaM + C * cosSigma * (
                        -1 + 2 * cos2SigmaM * cos2SigmaM
                    )
                )
            )
        );

    } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);

    if (iterLimit === 0) {
        return NaN;  // formula failed to converge
    }

    var uSq = (
        cosSqAlpha * (
            a * a - b * b
        ) / (
            b * b
        )
    );

    var A = (
        1 + uSq / 16384 * (
            4096 + uSq * (
                -768 + uSq * (
                    320 - 175 * uSq
                )
            )
        )
    );

    var B = (
        uSq / 1024 * (
            256 + uSq * (
                -128 + uSq * (
                    74 - 47 * uSq
                )
            )
        )
    );

    var deltaSigma = (
        B * sinSigma * (
            cos2SigmaM + B / 4 * (
                cosSigma * (
                    -1 + 2 * cos2SigmaM * cos2SigmaM
                ) - B / 6 * cos2SigmaM * (
                    -3 + 4 * sinSigma * sinSigma
                ) * (
                    -3 + 4 * cos2SigmaM * cos2SigmaM
                )
            )
        )
    );

    var distance = b * A * (sigma - deltaSigma);

    return +parseFloat(distance.toFixed(3)); // round to 1mm precision
};
