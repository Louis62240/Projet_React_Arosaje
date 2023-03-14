import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
const positionLille = [50.629250, 3.057256]; // position par défaut pour centrer la carte
const ListeVille = [
  { nom: "Lille" },
  { nom: "Roubaix" },
  { nom: "Tourcoing"}
];

class WorldMap extends Component {
  render() {
    const markers = ListeVille.map((ville, index) => (
      <Marker key={index} position={ville.position}>
        <Popup>{ville.nom}</Popup>
      </Marker>
    ));

    return (
      <div style={{ display: "flex" }}>
        <MapContainer
          style={{
            height: "600px",
            width: "1000px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px"
          }}
          center={positionLille}
          zoom={6}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
        </MapContainer>
      </div>
    );
  }
}

export default WorldMap;
