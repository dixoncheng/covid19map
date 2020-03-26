const fetch = require("@zeit/fetch-retry")(require("node-fetch"));

const URL = `https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=`;
const countries = ["NZ", "AU", "CN", "IT", "GB", "US"];

const getCountry = async country => {
  const response = await fetch(`${URL}${country}`);
  const json = await response.json();
  return json;
};

const api = async () => {
  const casesPer1M = [];
  for (const item of countries) {
    const data = await getCountry(item);
    const { confirmed } = data.latest;
    const { country: title, country_population } = data.locations[0];
    const numCases = Math.round(confirmed / (country_population / 1000000));
    casesPer1M.push({
      title: title === "US" ? "United States" : title,
      numCases
    });
  }
  return casesPer1M;
};

export default api;
