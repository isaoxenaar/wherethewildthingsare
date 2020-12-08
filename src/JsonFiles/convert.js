const json = require("./csvjson.json");

const whale1 = json.filter((w) => {
  //console.log(w.Ind);
  return w.Ind === 168446;
});

//console.log(whale1);
const coordinatesWhale1 = whale1.map((w) => {
  const coordinate = [w.Lon, w.Lat];
  //console.log(coordinate);
  return coordinate;
});

//console.log(coordinatesWhale1);

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

console.log(geojson.features[0].geometry);
