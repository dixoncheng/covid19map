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
import regions from "../data/dhbs.json";

// const test =

regions.map(region => {
  return region.boundary[0].map(item => {
    // item = item.reverse();
    // console.log(item);
    // return "test";
    return item.reverse();
  });
});
console.log(JSON.stringify(regions));

// const r = regions[0].boundary[0].map(item => {
//   return item.reverse();
// });
// console.log(r);

// console.log(regions);

// import getRegions from "../regions";
// const regions = getRegions();

const mapBounds = [
  [-32.90178557, 164.67596054],
  [-48.57478991, 181.27441406]
];

const nzBounds = [
  [-34.76671725, 166.2361908],
  [-47.30251579, 177.66849518]
];

const Map = ({ center, zoom, markers, onMarkerClick, currentView }) => {
  // merge regions and markers
  markers.forEach(marker => {
    const region = regions.find(x => x.name === marker.location);
    if (region) {
      Object.assign(region, marker);
    }
  });
  // console.log(regions);

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
    // const iconSize = 24 + normalize(totalCases);
    const iconSize = 28;
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
        minZoom={4}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer url="//{s}.tile.osm.org/{z}/{x}/{y}.png" />

        {regions.map(({ location, latlng, boundary, totalCases }, i) => (
          <FeatureGroup key={i}>
            {/* {boundary && ( */}
            <>
              {totalCases && (
                <>
                  <Marker position={latlng} icon={getIcon(totalCases)} />
                  <Popup>
                    <StyledPopup>
                      <div className="location">{location}</div>
                      <div className="cases">Number of cases: {totalCases}</div>
                    </StyledPopup>
                  </Popup>
                </>
              )}
              <Polygon
                color="black"
                opacity="0.2"
                fillColor="#51b6b0"
                fillOpacity={0.8}
                // fillOpacity={((totalCases || 0) - 0) / (58 - 0)}
                // stroke={false}
                weight={1}
                positions={boundary[0]}
                // smoothFactor={10}
                // onClick={() => onMarkerClick(location)}
              />
            </>
            {/* )} */}
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
    /* background: #51b6b0; */
    background: white;
    color: #204e61;
    text-shadow: 1px 1px 10px white;
    border-radius: 50%;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid #51b6b0 1px;
  }
`;
