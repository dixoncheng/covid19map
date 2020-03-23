import { useEffect, useRef } from "react";
import { Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import styled, { css, createGlobalStyle } from "styled-components";

const Map = ({ center, zoom, markers, onMarkerClick, currentView }) => {
  const mapRef = useRef();

  const mapBounds = [
    [-32.90178557, 164.67596054],
    [-48.57478991, 181.27441406]
  ];

  const nzBounds = [
    [-34.76671725, 166.2361908],
    [-47.30251579, 177.66849518]
  ];

  useEffect(() => {
    mapRef.current.leafletElement.fitBounds(nzBounds);
  }, []);

  useEffect(() => {
    if (currentView === "") {
      mapRef.current.leafletElement.closePopup();
    }
  }, [currentView]);

  const normalize = val => (val - 0) / (10 - 0);

  const getIcon = numCases => {
    const iconSize = 30 + normalize(numCases) * 10;
    return L.divIcon({
      className: "icon",
      iconSize: [iconSize, iconSize],
      html: `<div>${numCases}</div>`
    });
  };

  return (
    <div>
      <LeafletMap
        ref={mapRef}
        maxBounds={mapBounds}
        center={center}
        zoom={zoom}
        maxZoom={10}
        // minZoom={5}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer url="//{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {markers.map(({ latlng, numCases, location }, i) => (
          <Marker
            key={i}
            position={latlng}
            icon={getIcon(numCases)}
            onClick={() => onMarkerClick(location)}
          >
            <Popup>
              <StyledPopup>
                <div className="location">{location}</div>
                <div className="cases">Number of cases: {numCases}</div>
              </StyledPopup>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
      <Styles />
    </div>
  );
};

export default Map;

const StyledPopup = styled.div`
  ${({ theme }) => css`
    color: ${theme.dark};
    .location {
      font-weight: bold;
      font-size: 16px;
      font-family: ${theme.font};
    }
  `}
`;

const Styles = createGlobalStyle`
  .leaflet-container {
    height: 50vh;
    width: 100%;
  }
  @media (min-width: 700px) {
    .leaflet-container {
      height: 100vh;
    }
  }
  .icon {
    background: #51b6b0;
    color: white;
    border-radius: 50%;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid white 1px;
  }
`;
