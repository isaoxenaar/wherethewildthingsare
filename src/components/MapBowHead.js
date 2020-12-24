import React, { Component } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  Polyline,
} from "react-leaflet";
import { data } from "../D3_Html_Charts/rawdata";
import "../App.css";

class MapBowHead extends Component {
  render() {
    const uniqueWhales = (array) => {
      const double = {};
      const unique = [];
      array.forEach((e) => {
        if (!double[e.Ind]) {
          double[e.Ind] = true;
          unique.push(e.Ind);
        }
      });
      return unique;
    };

    const whaleNames = uniqueWhales(data);

    const allFeatures = whaleNames.map((n, i) => {
      const whale = data.filter((w) => {
        return w.Ind === n;
      });

      const coordinatesWhale = whale.map((w) => {
        const coordinate = [w.Lon, w.Lat];
        return coordinate;
      });

      const feature = {
        type: "Feature",
        id: n,
        properties: {
          name: n,
          color: `rgb(${0 + i * 15}, ${0 + i * 15}, ${0 + i * 15})`,
          weight: i,
        },
        geometry: {
          type: "LineString",
          coordinates: coordinatesWhale,
        },
      };
      return feature;
    });
    console.log(allFeatures);

    const geoJSON = {
      type: "FeatureCollection",
      features: allFeatures,
    };

    const position = [
      geoJSON.features[0].geometry.coordinates[0][1],
      geoJSON.features[0].geometry.coordinates[0][0],
    ];
    return (
      <MapContainer center={position} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          key={geoJSON.features[0].properties.name}
          position={position}
        ></Marker>
        <Polyline
          positions={geoJSON.features[0].geometry.coordinates}
          color={geoJSON.features[0].properties.color}
        ></Polyline>
        <GeoJSON
          data={geoJSON}
          style={(feature) => {
            return {
              color: feature.properties.color,
              weight: feature.properties.weight,
            };
          }}
        ></GeoJSON>
      </MapContainer>
    );
  }
}

export default MapBowHead;
