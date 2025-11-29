import React, { useState } from "react";
import "./Map.css";

const SearchInput = ({ markers, onSelect }) => {
  const [query, setQuery] = useState("");

  const matches = markers.filter((m) =>
    m.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const handleSelect = (coords, name) => {
    onSelect(coords, name);
    setQuery("");
  };

  return (
    <div className="map-search">
      <div className="map-search-wrapper">
        <input
          className="map-search-input"
          type="search"
          placeholder="Введіть вашу адресу"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="map-search-icon">🔍</span>
      </div>
      {query && (
        <div className="map-search-results">
          {matches.length ? (
            matches.map((m, i) => (
              <div
                key={i}
                onClick={() => handleSelect(m.coords, m.name)}
                className="map-search-item"
              >
                {m.name}
              </div>
            ))
          ) : (
            <div className="map-search-item">Нічого не знайдено</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
