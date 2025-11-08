import React from "react";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [51.505, -0.09];
const mapStyle = { height: "90vh" };

const Mapa = () => {
 

  return (
    <>
      <Map center={position} zoom={2} style={mapStyle} maxZoom={20}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
       
      </Map>
      <div>
        clearLayers and addLayers used. Look at the console to check performance
      </div>
    </>
  );
};

export default Mapa;
