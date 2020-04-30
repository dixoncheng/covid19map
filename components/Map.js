import { useEffect, useState, useRef } from "react";
import {
  Map as LeafletMap,
  Marker,
  Popup,
  TileLayer,
  Polygon,
  FeatureGroup,
} from "react-leaflet";
import L from "leaflet";
import styled, { css, createGlobalStyle, withTheme } from "styled-components";
import * as gtag from "../lib/gtag";

const Map = ({
  center,
  zoom,
  markers = [],
  clusters = {},
  onMarkerClick,
  maxCases,
  outerBounds,
  innerBounds,
  theme,
  location,
}) => {
  const mapRef = useRef();
  const [currentLocation, setCurrentLocation] = useState();
  const [currentZoom, setCurrentZoom] = useState("100");

  useEffect(() => {
    mapRef.current.leafletElement.fitBounds(innerBounds);
  }, [mapRef.current]);

  useEffect(() => {
    // if (location === "") {
    mapRef.current.leafletElement.closePopup();
    setCurrentLocation("");
    // }
  }, [location]);

  const getRegionIcon = (className, totalCases) => {
    const iconSize = 24;
    return L.divIcon({
      className: `marker ${className}`,
      iconSize: [iconSize, iconSize],
      html: `<div>${totalCases}</div>`,
    });
  };

  const getClusterIcon = (className, totalCases) => {
    const normalise = totalCases / 100;
    const iconSize = 24 + normalise * 15;
    // const iconSize = 28;
    return L.divIcon({
      className: `marker ${className}`,
      iconSize: [iconSize, iconSize],
      html: `<div></div>`,
    });
  };

  const onLocationClick = (name) => {
    setCurrentLocation(name);
    onMarkerClick(name);
  };

  const onZoomend = () => {
    setCurrentZoom(mapRef?.current?.leafletElement?.getZoom());
  };

  return (
    <div style={{ position: "relative" }}>
      <MapLegend>
        <div>
          <span className="map-cluster" /> Clusters
        </div>
        <div>
          <span className="map-hosp" /> Region with cases in hospital
        </div>
      </MapLegend>
      <LeafletMap
        onClick={() => onLocationClick("")}
        ref={mapRef}
        maxBounds={outerBounds}
        center={center}
        zoom={zoom}
        maxZoom={7}
        minZoom={5}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        onZoomend={onZoomend}
        // attributionControl={false}
      >
        {/* <TileLayer url="//{s}.tile.osm.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url="//{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="//www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {markers.map(
          (
            {
              name,
              latlng,
              boundary,
              totalCases,
              active,
              recovered,
              deaths,
              inHospital,
            },
            i
          ) => (
            <FeatureGroup key={i}>
              <Marker
                position={latlng}
                icon={getRegionIcon(
                  `region ${inHospital > 0 ? "hospital" : ""}`,
                  active
                )}
                zIndexOffset={100}
                onClick={() => {
                  onLocationClick(name);
                  gtag.event("Marker", "Map", name);
                }}
              />
              <Popup>
                <StyledPopup>
                  <div className="location">{name}</div>
                  <div className="cases">
                    {active} active case{active > 1 && "s"}
                    <br />
                    {recovered} recovered
                    <br />
                    {totalCases} total case{totalCases > 1 && "s"}
                    {deaths > 0 && (
                      <>
                        <br />
                        {deaths} death{deaths > 1 && "s"}
                      </>
                    )}
                  </div>
                  {inHospital > 0 && (
                    <div className="cases">{inHospital} in hospital</div>
                  )}
                </StyledPopup>
              </Popup>
              <Polygon
                color={currentLocation === name ? "white" : "black"}
                opacity={currentLocation === name ? 1 : 0.2}
                weight={currentLocation === name ? 3 : 1}
                fillColor={theme.teal}
                fillOpacity={((active || 0) - -10) / (maxCases + 10 - 1)}
                positions={boundary[0]}
                // smoothFactor={10}
                onClick={() => {
                  onLocationClick(name);
                  gtag.event("Region", "Map", name);
                }}
              />
            </FeatureGroup>
          )
        )}
        {Object.keys(clusters).map((regionName, i) =>
          Object.keys(clusters[regionName]).map((clustLocName, i) => {
            const { latlng, count, items } = clusters[regionName][clustLocName];
            return (
              <Marker
                key={i}
                position={latlng}
                icon={getClusterIcon("cluster", count)}
                // zIndexOffset={100}
                onClick={() => gtag.event("Cluster", "Map", clustLocName)}
              >
                <Popup>
                  <StyledPopup>
                    <div className="head">
                      {clustLocName} cluster{items.length > 1 && "s"}
                    </div>
                    {items.map(({ name, totalCases }, i) => (
                      <div className="cluster-desc" key={i}>
                        <div className="location">{name}</div>
                        <div className="cases">{totalCases} cases</div>
                      </div>
                    ))}
                  </StyledPopup>
                </Popup>
              </Marker>
            );
          })
        )}
      </LeafletMap>
      <Styles currentZoom={currentZoom} />
    </div>
  );
};

export default withTheme(Map);

const StyledPopup = styled.div`
  ${({ theme }) => css`
    color: ${theme.dark};
    .head {
      color: ${theme.teal};
    }
    .location {
      font-weight: bold;
      font-size: 16px;
      font-family: ${theme.font};
    }
    .cluster-desc {
      .location {
        font-size: 14px;
      }
    }
    .cluster-desc + .cluster-desc {
      margin-top: 0.5em;
    }
  `}
`;

const Styles = createGlobalStyle`
  ${({ theme, currentZoom }) => css`
    .leaflet-container {
      height: 50vh;
      width: 100%;
    }
    @media (min-width: 700px) {
      .leaflet-container {
        height: 100vh;
      }
    }
    .marker {
      transition: all 0.2s;
      font-family: "Nunito", sans-serif;
      color: #204e61;
      border-radius: 50%;
      font-size: 12px;

      ${currentZoom >= 6 &&
      css`
        font-size: 16px;
      `}
      ${currentZoom >= 7 &&
      css`
        font-size: 18px;
      `}

      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .region {
      text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
        1px 1px 0 white;
      pointer-events: none !important;
    }
    .cluster {
      color: #204e61;
      background: rgba(255, 201, 6, 0.4);
      border: solid rgba(255, 201, 6, 1) 1px;
    }
    .hospital {
      /* background: rgba(170, 205, 110, 1);
      border: solid rgb(170, 205, 110); 1px; */
      /* background: white; */

      > div {
        position: relative;
        :after {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 0.1em;
          left: 105%;
          background: url(${require(`../public/icons/hospo.svg`)}) no-repeat;
        }
      }
    }
  `}
`;

const MapLegend = styled.div`
  ${({ theme }) => css`
    position: absolute;
    bottom: 26px;
    right: 10px;
    background: white;
    border-radius: 5px;
    z-index: 999;
    padding: 10px;
    font-size: 12px;
    .map-cluster,
    .map-hosp {
      width: 14px;
      height: 14px;
      display: inline-block;
      margin-right: 2px;
      vertical-align: middle;
      position: relative;
      top: -2px;
    }
    .map-cluster {
      background: ${theme.yellow};
      border-radius: 50%;
    }
    .map-hosp {
      background: url(${require(`../public/icons/hospo.svg`)}) no-repeat;
      background-size: contain;
    }
    @media (min-width: ${theme.sm}) {
      font-size: 14px;
      bottom: 36px;
      right: 20px;
    }
  `}
`;
