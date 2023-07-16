function generatePoint(
  latitude,
  longitude,
  distanceInMetres,
  bearing = Math.floor(Math.random() * (360 - 1) + 1),
) {
  const brngRad = deg2Rad(bearing);
  const latRad = deg2Rad(latitude);
  const lonRad = deg2Rad(longitude);

  const EARTH_RADIUS_IN_METRES = 6371000;

  const distFrac = distanceInMetres / EARTH_RADIUS_IN_METRES;

  const latitudeResult = Math.asin(
    Math.sin(latRad) * Math.cos(distFrac) +
      Math.cos(latRad) * Math.sin(distFrac) * Math.cos(brngRad),
  );
  const a = Math.atan2(
    Math.sin(brngRad) * Math.sin(distFrac) * Math.cos(latRad),
    Math.cos(distFrac) - Math.sin(latRad) * Math.sin(latitudeResult),
  );

  const longitudeResult =
    ((lonRad + a + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;

  console.log(longitudeResult);
  return {
    latitude: rad2Deg(latitudeResult),
    longitude: rad2Deg(longitudeResult),
    bearing,
  };
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d.toFixed(1) * 1000;
}

function toRad(Value) {
  return (Value * Math.PI) / 180;
}

function deg2Rad(deg) {
  return deg * (Math.PI / 180);
}

function rad2Deg(rad) {
  return rad * (180 / Math.PI);
}

export { generatePoint, calculateDistance };
