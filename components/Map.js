import { useEffect, useState, useRef } from "react";
import {
  Map as LeafletMap,
  Marker,
  Popup,
  TileLayer,
  Polygon,
  FeatureGroup
} from "react-leaflet";
import L from "leaflet";
import styled, { css, createGlobalStyle } from "styled-components";

const Map = ({
  center,
  zoom,
  markers,
  clusters,
  onMarkerClick,
  currentView,
  maxCases,
  outerBounds,
  innerBounds
}) => {
  console.log(clusters);
  const mapRef = useRef();
  const [currentLocation, setCurrentLocation] = useState();
  useEffect(() => {
    mapRef.current.leafletElement.fitBounds(innerBounds);
  }, [mapRef.current]);

  useEffect(() => {
    if (currentView === "") {
      mapRef.current.leafletElement.closePopup();
      setCurrentLocation("");
    }
  }, [currentView]);

  const getIcon = (className, totalCases) => {
    const normalise = totalCases / 100;
    const iconSize = 24 + normalise * 40;
    // const iconSize = 28;
    return L.divIcon({
      className,
      iconSize: [iconSize, iconSize],
      html: `<div style="font-size: ${16 +
        normalise * 14}px">${totalCases}</div>`
    });
  };

  const onLocationClick = location => {
    setCurrentLocation(location);
    onMarkerClick(location);
  };

  return (
    <div>
      <LeafletMap
        ref={mapRef}
        maxBounds={outerBounds}
        center={center}
        zoom={zoom}
        maxZoom={8}
        minZoom={4}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        attributionControl={false}
        onClick={() => onLocationClick("")}
      >
        <TileLayer url="//{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {markers.map(({ location, latlng, boundary, totalCases }, i) => (
          <FeatureGroup key={i}>
            {totalCases && (
              <>
                <Marker
                  position={latlng}
                  icon={getIcon("region", totalCases)}
                  onClick={() => onLocationClick(location)}
                />
                <Popup>
                  <StyledPopup>
                    <div className="location">{location}</div>
                    <div className="cases">Number of cases: {totalCases}</div>
                  </StyledPopup>
                </Popup>
              </>
            )}
            <Polygon
              color={currentLocation === location ? "white" : "black"}
              opacity={currentLocation === location ? 1 : 0.2}
              weight={currentLocation === location ? 3 : 1}
              fillColor="#51b6b0"
              fillOpacity={((totalCases || 0) - -20) / (maxCases + 10 - 1)}
              positions={boundary[0]}
              // smoothFactor={10}
              onClick={() => onLocationClick(location)}
            />
          </FeatureGroup>
        ))}
        {clusters.map(({ latlng, totalCases, clusters: clusterItems }, i) => (
          <Marker
            key={i}
            position={latlng}
            icon={getIcon("cluster", totalCases)}
          >
            <Popup>
              <StyledPopup>
                {clusterItems.map(({ name, totalCases }, i) => (
                  <div className="cluster-desc" key={i}>
                    <div className="location">{name}</div>
                    <div className="cases">Number of cases: {totalCases}</div>
                  </div>
                ))}
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
    .cluster-desc + .cluster-desc {
      margin-top: 0.5em;
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
  .region,
  .cluster {
    font-family: "Nunito", sans-serif;
    /* background: #51b6b0; */
    background: white;
    color: #204e61;
    /* text-shadow: 1px 1px 10px white; */
    border-radius: 50%;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid #51b6b0 1px;
  }
  .cluster {
    color: #204e61;
    background: red;
    border: solid #51b6b0 1px;

  }
`;
