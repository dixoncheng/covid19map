import lakes from "./regions/lakes";
import hawkesBay from "./regions/hawkesBay";
import auckland from "./regions/auckland";
import canterbury from "./regions/canterbury";
import waitemata from "./regions/waitemata";
import nelson from "./regions/nelson";
import hutt from "./regions/hutt";
import waikato from "./regions/waikato";
import taranaki from "./regions/taranaki";
import southCanterbury from "./regions/southCanterbury";
import whanganui from "./regions/whanganui";
import capital from "./regions/capital";
import tairawhiti from "./regions/tairawhiti";
import wairarapa from "./regions/wairarapa";
import northland from "./regions/northland";
import manukau from "./regions/manukau";
import southern from "./regions/southern";
import bayOfPlenty from "./regions/bayOfPlenty";
import midCentral from "./regions/midCentral";
import westCoast from "./regions/westCoast";

const locations = [
  { location: "Auckland", latlng: [-36.852095, 174.7631803], wkt: auckland },
  {
    location: "Bay of Plenty",
    latlng: [-37.84857835, 176.60788536],
    wkt: bayOfPlenty
  },
  {
    location: "Canterbury",
    latlng: [-43.40193734, 172.65916944],
    wkt: canterbury
  },
  {
    location: "Capital and Coast",
    latlng: [-41.2887953, 174.7772114],
    wkt: capital
  },
  {
    location: "Counties Manukau",
    latlng: [-37.1676528, 174.8947263],
    wkt: manukau
  },
  {
    location: "Hawke's Bay",
    latlng: [-39.4343279, 176.7652742],
    wkt: hawkesBay
  },
  { location: "Hutt Valley", latlng: [-41.1240674, 175.0699589], wkt: hutt },
  { location: "Lakes", latlng: [-38.7993662, 176.11009674], wkt: lakes },
  {
    location: "MidCentral",
    latlng: [-40.356317, 175.6112388],
    wkt: midCentral
  },
  {
    location: "Nelson Marlborough",
    latlng: [-41.47447475, 173.83302626],
    wkt: nelson
  },
  { location: "Northland", latlng: [-35.3712702, 173.7405337], wkt: northland },
  {
    location: "South Canterbury",
    latlng: [-44.64316247, 171.0031414],
    wkt: southCanterbury
  },
  { location: "Southern", latlng: [-45.55613134, 170.13322592], wkt: southern },
  {
    location: "Tairāwhiti",
    latlng: [-38.6636801, 178.028489],
    wkt: tairawhiti
  },
  { location: "Taranaki", latlng: [-39.2711067, 174.154795], wkt: taranaki },
  { location: "Waikato", latlng: [-37.77922725, 175.20103232], wkt: waikato },
  {
    location: "Wairarapa",
    latlng: [-41.23617985, 175.21969019],
    wkt: wairarapa
  },
  {
    location: "Waitemata",
    latlng: [-36.51801762, 174.44932938],
    wkt: waitemata
  },
  {
    location: "West Coast",
    latlng: [-42.22864447, 171.33157253],
    wkt: westCoast
  },
  { location: "Whanganui", latlng: [-39.9324904, 175.0519306], wkt: whanganui }
];

export default locations;
