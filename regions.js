import Wkt from "wicket/wicket-leaflet";
import locations from "./data/locations";

const getRegions = () => {
  locations.forEach(item => {
    if (item.wkt) {
      const wicket = new Wkt.Wkt();
      wicket.read(item.wkt);
      item.boundary = wicket.toObject().getLatLngs();
      item.wkt = null;
    }
  });
  return locations;
};

export default getRegions;
