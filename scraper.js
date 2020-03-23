import cheerio from "cheerio";
import locations from "./constants/locations";
// import mohHtml from "./moh-html";

const fetch = require("@zeit/fetch-retry")(require("node-fetch"));

const URL = `https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases?${new Date()}`;

const scraper = async () => {
  const response = await fetch(URL);
  const html = await response.text();
  // const html = mohHtml;

  const $ = await cheerio.load(html);

  // const lastUpdated = $(".page_updated .date").text();
  const lastUpdated = $(".field-name-body .georgia-italic")
    .first()
    .text();

  let cases = [];
  $(".table-style-two tbody tr").each((i, elem) => {
    cases.push({
      caseId: $(elem)
        .find("td:nth-child(1)")
        .text()
        .trim(),
      location: $(elem)
        .find("td:nth-child(2)")
        .text()
        .trim(),
      age: $(elem)
        .find("td:nth-child(3)")
        .text()
        .trim(),
      gender: $(elem)
        .find("td:nth-child(4)")
        .text()
        .trim(),
      details: $(elem)
        .find("td:nth-child(5)")
        .text()
        .trim()
    });
  });

  let data = [];
  let totalCases = 0;
  cases.forEach(item => {
    if (item.location) {
      totalCases++;

      // correct typos on MOH site
      if (item.location === "Coramandel") {
        item.location = "Coromandel";
      }
      if (item.location === "Dundedin") {
        item.location = "Dunedin";
      }

      // normalize genders
      if (item.gender === "M") {
        item.gender = "Male";
      }
      if (item.gender === "F") {
        item.gender = "Female";
      }

      const n = data.find(x => item.location === x.location);
      if (n) {
        n.numCases++;
        n.cases.push(item);
      } else {
        const loc = locations.find(x => item.location === x.location);
        if (loc) {
          data.push({
            location: item.location,
            numCases: 1,
            latlng: loc.latlng,
            cases: [item]
          });
        } else {
          // region doesn't exist in constants
          throw new Error(`No location "${item.location}" exist`);
        }
      }
    }
  });

  data.sort((a, b) => {
    if (a.numCases === b.numCases) {
      return a.location > b.location ? 1 : -1;
    }
    return a.numCases > b.numCases ? -1 : 1;
  });

  return { data, lastUpdated, totalCases };
};

export default scraper;
