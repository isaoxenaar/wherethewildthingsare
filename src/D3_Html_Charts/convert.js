const json = require("./csvjson.json");

const whale1 = json.filter((w) => {
  return w.Ind === 168446;
});

const coordinatesWhale1 = whale1.map((w) => {
  const coordinate = [w.Lon, w.Lat];
  return coordinate;
});

var geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "01",
      properties: { name: "168446" },
      geometry: {
        type: "LineString",
        coordinates: coordinatesWhale1,
      },
    },
  ],
};
console.log(geojson);
