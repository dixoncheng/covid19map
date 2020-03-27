import { useEffect, useRef } from "react";
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
import Wkt from "wicket/wicket-leaflet";

import lakes from "../data/regions/lakes";
import hutt from "../data/regions/hutt";

const regions = [{ wkt: lakes }, { wkt: hutt }];

regions.forEach(item => {
  const wicket = new Wkt.Wkt();
  wicket.read(item.wkt);
  item.latlng = wicket.toObject().getLatLngs();
});

const mapBounds = [
  [-32.90178557, 164.67596054],
  [-48.57478991, 181.27441406]
];

const nzBounds = [
  [-34.76671725, 166.2361908],
  [-47.30251579, 177.66849518]
];

const Map = ({ center, zoom, markers, onMarkerClick, currentView }) => {
  const mapRef = useRef();
  useEffect(() => {
    mapRef.current.leafletElement.fitBounds(nzBounds);
  }, [mapRef.current]);

  useEffect(() => {
    if (currentView === "") {
      mapRef.current.leafletElement.closePopup();
    }
  }, [currentView]);

  const normalize = val => (val - 0) / (1.5 - 0);

  const getIcon = totalCases => {
    const iconSize = 24 + normalize(totalCases);
    return L.divIcon({
      className: "icon",
      iconSize: [iconSize, iconSize],
      html: `<div>${totalCases}</div>`
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

        {regions.map((item, i) => (
          <FeatureGroup key={i} color="#204e61">
            <Popup>Popup in FeatureGroup</Popup>
            <Polygon positions={item.latlng} />
          </FeatureGroup>
        ))}

        {/* {markers.map(({ latlng, totalCases, location }, i) => (
          <Marker
            key={i}
            position={latlng}
            icon={getIcon(totalCases)}
            // onClick={() => onMarkerClick(location)}
          >
            <Popup>
              <StyledPopup>
                <div className="location">{location}</div>
                <div className="cases">Number of cases: {totalCases}</div>
              </StyledPopup>
            </Popup>
          </Marker>
        ))} */}
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
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid white 1px;
  }
`;
