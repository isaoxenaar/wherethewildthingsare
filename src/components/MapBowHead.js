import React, { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
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

    return (
      <MapContainer center={[78.90136, 13.4838879]} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    );
  }
}

export default MapBowHead;
