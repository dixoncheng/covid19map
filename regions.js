// import L from "leaflet";
import Wkt from "wicket/wicket-leaflet";
import lakes from "./data/regions/lakes";
import hutt from "./data/regions/hutt";

const regions = () => {
  const regionList = [{ wkt: lakes }, { wkt: hutt }];
  regionList.forEach(item => {
    const wicket = new Wkt.Wkt();
    wicket.read(item.wkt);
    item.latlng = wicket.toObject().getLatLngs();
  });
  return regionList;
};

export default regions;
