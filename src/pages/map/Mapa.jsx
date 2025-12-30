import React, { useRef, useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from 'react-router-dom'
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SearchInput from "./SearchInput";
import "./Map.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import streetsCoords from "../../data/streets-coords.json";

delete (L.Icon.Default).prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


// Kyiv coordinates: latitude 50.4501, longitude 30.5234
const position = [50.4501, 30.5234];
const mapStyle = { height: "90vh" };

// Street names in Kyiv — we'll geocode to get accurate positions at runtime
const streetMarkers = [
  "Юрія Іллєнка",
  "Антона Цедіка",
  "Берестейський",
  "Велика Васильківська",
  "Німецька",
  "Іоанна Павла II",
  "Новопечерський",
  "Нижньоюрківська",
  "Татарський",
  "Андрія Аболмасова",
  "Дениса Рачінського",
  "Євгена Маланюка",
  "Флоренції",
  "Митрополита Андрея Шептицького",
  "Тютюнника",
  "Академіка Філатова",
  "Саперне Поле",
  "Єжи Гедройця",
  "Ованеса Туманяна",
  "Євгена Сверстюка",
  "Євгена Коновальця",
  "Василя Тютюнника",
  "Багговутівська",
  "Миколи Мурашка",
  "Платона Майбороди",
  "Половецька",
  "князя Володимира Мономаха",
  "Печенізька",
  "Татарська",
  "Підгірна",
  "Лук'янівська",
  "Герцена",
  "Академіка Ромоданова",
  "Макарівська",
  "Деревлянська",
  "Гарматна",
  "Машинобудівна",
  "пров. Машинобудівний",
  "Олексі Тихого",
  "Дністровська",
];

const Mapa = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [popupForm, setPopupForm] = useState({ name: '', phone: '' });
  const [markersState, setMarkersState] = useState(() =>
    streetMarkers.map((name) => ({ name, coords: null, status: 'loading' }))
  );
  const [geocodeTick, setGeocodeTick] = useState(0);

  const goTo = (coords, name) => {
    const leafletMap = mapRef.current && mapRef.current.leafletElement;
    if (!leafletMap) return;
    leafletMap.flyTo(coords, 16);
    // show a popup at the location
    L.popup({ maxWidth: 300 })
      .setLatLng(coords)
      .setContent(`<strong>${name}</strong>`)
      .openOn(leafletMap);
  };

  const handleSubmitPopup = (e, markerName) => {
    e.preventDefault();
    // navigate to /input with prefilled query params
    const params = new URLSearchParams();
    if (popupForm.name) params.set('name', popupForm.name);
    if (popupForm.phone) params.set('phone', popupForm.phone);
    if (markerName) params.set('street', markerName);
    params.set('fromPopup', '1');
    navigate(`/input?${params.toString()}`);
  };

  const handlePopupInput = (e) => {
    const { name, value } = e.target;
    setPopupForm(prev => ({ ...prev, [name]: value }));
  };

  // refs to marker components so we can open popups programmatically
  const markerRefs = React.useRef({});

  // When markersState updates, open each marker's popup as soon as coords are available
  React.useEffect(() => {
    markersState.forEach(m => {
      if (m.coords) {
        const ref = markerRefs.current[m.name];
        if (ref && ref.leafletElement && typeof ref.leafletElement.openPopup === 'function') {
          try { ref.leafletElement.openPopup(); } catch (e) { /* ignore */ }
        }
      }
    });
  }, [markersState]);

  // Geocode street names (Nominatim) to get accurate marker positions.
  // Prefer static precomputed coordinates from `src/data/streets-coords.json` if present;
  // otherwise perform batched parallel geocoding and update all markers in a single state update
  React.useEffect(() => {
    let mounted = true;
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    const geocodeOne = async (street) => {
      const key = `geocode:${street}`;
      try {
        const cached = localStorage.getItem(key);
        if (cached) return JSON.parse(cached);

        const q = encodeURIComponent(`${street}, Київ, Україна`);
        const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${q}`;
        const res = await fetch(url, { headers: { 'Accept-Language': 'uk' } });
        const data = await res.json();
        if (data && data[0] && data[0].lat && data[0].lon) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          localStorage.setItem(key, JSON.stringify({ lat, lon }));
          return { lat, lon };
        }
      } catch (e) {
        // ignore errors
      }
      return null;
    };

    const tryStatic = () => {
      if (!streetsCoords) return null;
      // If the static file is an array of { name, coords } or a mapping, normalize to a map
      if (Array.isArray(streetsCoords) && streetsCoords.length > 0) {
        const map = {};
        streetsCoords.forEach(item => {
          if (item && item.name && item.coords) map[item.name] = item.coords;
        });
        return Object.keys(map).length ? map : null;
      }
      if (typeof streetsCoords === 'object' && Object.keys(streetsCoords).length > 0) return streetsCoords;
      return null;
    };

    (async () => {
      const staticMap = tryStatic();
      if (staticMap) {
        if (!mounted) return;
        setMarkersState(streetMarkers.map(name => ({ name, coords: staticMap[name] ? [staticMap[name][0], staticMap[name][1]] : null, status: staticMap[name] ? 'ok' : 'not-found' })));
        return;
      }

      // Batched geocoding to fetch many results quickly but without blasting the geocoder.
      const concurrency = 5;
      const results = {};
      for (let i = 0; i < streetMarkers.length; i += concurrency) {
        const batch = streetMarkers.slice(i, i + concurrency);
        const promises = batch.map(async (name) => {
          // prefer cached
          const key = `geocode:${name}`;
          const cached = localStorage.getItem(key);
          if (cached) {
            const c = JSON.parse(cached);
            results[name] = [c.lat, c.lon];
            return;
          }
          const coords = await geocodeOne(name);
          if (coords) results[name] = [coords.lat, coords.lon];
        });
        await Promise.all(promises);
        // small pause between batches
        await sleep(250);
      }
      if (!mounted) return;
      setMarkersState(streetMarkers.map(name => ({ name, coords: results[name] || null, status: results[name] ? 'ok' : 'not-found' })));
    })();

    return () => { mounted = false };
  }, [geocodeTick]);

  const clearGeocodeCache = () => {
    streetMarkers.forEach(s => localStorage.removeItem(`geocode:${s}`));
    // reset markers state
    setMarkersState(streetMarkers.map((name) => ({ name, coords: null, status: 'loading' })));
    // trigger re-run
    setGeocodeTick(t => t + 1);
  };

  const rerunGeocode = () => {
    setMarkersState(streetMarkers.map((name) => ({ name, coords: null, status: 'loading' })));
    setGeocodeTick(t => t + 1);
  }

  return (
    <div className="contmap">
      <SearchInput
        markers={markersState.filter(m => m.coords).map(m => ({ name: m.name, coords: m.coords }))}
        onSelect={goTo}
      />

      <Map
        ref={mapRef}
        className="map"
        center={position}
        zoom={13}
        style={mapStyle}
        maxZoom={20}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markersState.map((marker) => (
          marker.coords ? (
            <Marker key={marker.name} position={marker.coords} ref={el => { markerRefs.current[marker.name] = el; }}>
              <Popup offset={[0, -25]} autoPan={true} maxWidth={320}>
                <div style={{minWidth:200}}>
                  <strong>{marker.name}</strong>
                  <form onSubmit={(e) => handleSubmitPopup(e, marker.name)} style={{marginTop:8}}>
                    <input name="name" placeholder="Ім'я" value={popupForm.name} onChange={handlePopupInput} style={{width:'100%',marginBottom:6,padding:6}} />
                    <input name="phone" placeholder="Телефон" value={popupForm.phone} onChange={handlePopupInput} style={{width:'100%',marginBottom:6,padding:6}} />
                    <div style={{display:'flex',gap:8}}>
                      <button type="submit" style={{flex:1,padding:'8px 10px'}}>Подати заявку</button>
                      <button type="button" onClick={() => navigate(`/input?street=${encodeURIComponent(marker.name)}`)} style={{flex:1,padding:'8px 10px'}}>Відкрити форму</button>
                    </div>
                  </form>
                </div>
              </Popup>
            </Marker>
          ) : null
        ))}
      </Map>

      
    </div>
  );
};

export default Mapa;