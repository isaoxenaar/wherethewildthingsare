import React, { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { data } from "../D3_Html_Charts/rawdata";
import "../App.css";

class MapBowHead extends Component {
  render() {
    const whale1 = data.filter((w) => {
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
    console.log(geojson.features[0].geometry);

    return (
      <MapContainer center={[78.90136, 13.4838879]} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          key={geojson.features[0].properties.name}
          position={[
            geojson.features[0].geometry.coordinates[0][1],
            geojson.features[0].geometry.coordinates[0][0],
          ]}
        ></Marker>
        <GeoJSON data={geojson}></GeoJSON>
      </MapContainer>
    );
  }
}

export default MapBowHead;
