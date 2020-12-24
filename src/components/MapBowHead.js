import React, { Component } from "react";
import styled from "styled-components";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { data } from "../D3_Html_Charts/rawdata";
import "../App.css";

const white = "#FFFFFF";
const grey = "#B0A175";

const BooleanButton = styled.div`
all: unset;
width: 25%;
margin-bottom: 3rem;
margin: auto;
padding: 1rem;
display: flex;
justify-content: center;
align-items: center;
background-color: ${grey};
text-align: center;
font-size: 24px;
font-family: "Times New Roman";
color: ${white};
border-radius: 4px;
cursor: pointer;
&:hover {
  color: ${grey};
  background-color: ${white};
`;

class MapBowHead extends Component {
  state = {
    showList: false,
  };

  render() {
    //create a geojson from rawdata
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

    const geoJSON = {
      type: "FeatureCollection",
      features: allFeatures,
    };

    //create position for markers
    const position = [
      geoJSON.features[0].geometry.coordinates[0][1],
      geoJSON.features[0].geometry.coordinates[0][0],
    ];

    const positionsMarkers = geoJSON.features.map((f) => {
      const c = [f.geometry.coordinates[0][1], f.geometry.coordinates[0][0]];
      const n = f.properties.name;
      const b = [c, n];
      return b;
    });

    //create list of markers
    const markers = positionsMarkers.map((p, i) => {
      const icon = L.icon({
        iconUrl: "https://cdn2.webdamdb.com/1280_SMQqW23s1bNH.png?1509021505",
        iconSize: [120, 80],
      });
      return (
        <Marker key={i} position={p[0]} icon={icon}>
          <Popup>
            <b>Hej! I am whale {p[1]}</b>
          </Popup>
        </Marker>
      );
    });
    //logic for the Buttontext
    const listButtonText = this.state.showList ? "Hide" : "Bowhead Paths";
    //the big return statement
    return (
      <div>
        <BooleanButton
          onClick={() => {
            this.setState({ showList: !this.state.showList });
          }}
        >
          {listButtonText}
        </BooleanButton>
        {this.state.showList && (
          <MapContainer center={position} zoom={5}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
              data={geoJSON}
              style={(feature) => {
                return {
                  color: feature.properties.color,
                  weight: feature.properties.weight,
                };
              }}
            ></GeoJSON>
            {markers}
          </MapContainer>
        )}
      </div>
    );
  }
}

export default MapBowHead;
