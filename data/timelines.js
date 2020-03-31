const fetch = require("@zeit/fetch-retry")(require("node-fetch"));

const COUNTRY = "nz";
const URL = `https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=${COUNTRY}&timelines=1`;

const processTimeline = timeline => {
  let arr = [];
  let days = -1;
  for (var prop in timeline) {
    if (Object.prototype.hasOwnProperty.call(timeline, prop)) {
      // only start counting when first case detected
      if (timeline[prop] > 0 && days < 0) {
        days = 0;
      }
      if (days >= 0) {
        arr.push({ days, cases: timeline[prop] });
        days++;
      }
    }
  }
  return arr;
};

const getTimelines = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  const { timelines } = json.locations[0];
  const confirmed = processTimeline(timelines.confirmed.timeline);
  const deaths = processTimeline(timelines.deaths.timeline);
  return {
    confirmed,
    deaths
  };
};

export default getTimelines;
