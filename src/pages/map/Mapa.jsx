import React, { useState, useRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SearchInput from "./SearchInput";
import "./Map.css";
// Kyiv coordinates: latitude 50.4501, longitude 30.5234
const position = [50.4501, 30.5234];
const mapStyle = { height: "90vh" };

// Street locations with coordinates in Kyiv
const  streetMarkers = [
  { name: "Юрія Іллєнка", coords: [50.4512, 30.5420] },
  { name: "Парково-Сирецька", coords: [50.4598, 30.5301] },
  { name: "Дегтярівська", coords: [50.4650, 30.5380] },
  { name: "Новоукраїнська", coords: [50.4720, 30.5450] },
  { name: "Степана Руданського", coords: [50.4580, 30.5320] },
  { name: "Антона Цедіка", coords: [50.4490, 30.5280] },
  { name: "Чистяківська", coords: [50.4410, 30.5350] },
  { name: "Рене Декарта", coords: [50.4540, 30.5180] },
  { name: "Червонозаводський", coords: [50.4680, 30.5520] },
  { name: "Кулібіна", coords: [50.4750, 30.5290] },
  { name: "Берестейський", coords: [50.4800, 30.5410] },
  { name: "Стрийська", coords: [50.4620, 30.5620] },
  { name: "Галаганівська", coords: [50.4380, 30.5480] },
  { name: "Велика Васильківська", coords: [50.4450, 30.5150] },
  { name: "Німецька", coords: [50.4520, 30.4980] },
  { name: "Іоанна Павла II", coords: [50.4380, 30.5050] },
  { name: "Новопечерський", coords: [50.4310, 30.5200] },
  { name: "Нижньоюрківська", coords: [50.4280, 30.5350] },
  { name: "Татарський", coords: [50.4340, 30.5600] },
  { name: "Олексія Бездольного", coords: [50.4400, 30.5750] },
  { name: "Ескаваторна", coords: [50.4480, 30.5850] },
  { name: "Андрія Абломасова", coords: [50.4560, 30.5950] },
  
];

const Mapa = () => {
  const mapRef = useRef(null);

  const goTo = (coords, name) => {
    const leafletMap = mapRef.current && mapRef.current.leafletElement;
    if (!leafletMap) return;
    leafletMap.flyTo(coords, 16);
    // show a popup at the location
    L.popup({ maxWidth: 300, color: 'black' })
      .setLatLng(coords)
      .setContent(`<strong>${name}</strong>`)
      .openOn(leafletMap);
  };

  return (
    <div className="contmap">
      <SearchInput markers={streetMarkers} onSelect={goTo} />

      <Map
        ref={mapRef}
        className="map"
        center={position}
        zoom={13}
        style={mapStyle}
        maxZoom={20}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {streetMarkers.map((marker, idx) => (
          <Marker key={idx} position={marker.coords}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default Mapa;
