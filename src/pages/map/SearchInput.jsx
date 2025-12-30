import React, { useState } from "react";
import "./Map.css";

const SearchInput = ({ markers, onSelect }) => {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const matches = (markers || []).filter((m) => {
    const name = m && typeof m === 'object' ? m.name : m;
    return name && name.toLowerCase().includes(q);
  });

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
            matches.map((m, i) => {
              const displayName = (m && typeof m === 'object') ? m.name : m;
              return (
                <div
                  key={i}
                  onClick={() => handleSelect((m && m.coords) || null, displayName)}
                  className="map-search-item"
                >
                  {displayName}
                </div>
              )
            })
          ) : (
            <div className="map-search-item">Нічого не знайдено</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
