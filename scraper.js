import cheerio from "cheerio";
import locations from "./data/locations";
const fetch = require("@zeit/fetch-retry")(require("node-fetch"));
// import mohHtml from "./moh-html";
import { staticData } from "./data/static";

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

  let rows = [];
  $(".table-style-two")
    .eq(0)
    .find("tbody tr")
    .each((i, elem) => {
      const location = $(elem)
        .find("td:nth-child(1)")
        .text()
        .trim();

      const totalCases = parseInt(
        $(elem)
          .find("td:nth-child(4)")
          .text()
          .trim()
      );

      if (location && location !== "Total" && totalCases > 0) {
        const latlngItem = locations.find(x => location === x.location);
        if (!latlngItem) {
          // throw new Error(`No location "${location}" exist`);
        }

        const confirmedCases = parseInt(
          $(elem)
            .find("td:nth-child(2)")
            .text()
            .trim()
        );

        const probableCases = parseInt(
          $(elem)
            .find("td:nth-child(3)")
            .text()
            .trim()
        );

        rows.push({
          location,
          confirmedCases,
          probableCases,
          totalCases,
          ...latlngItem
        });
      }
    });

  rows.sort((a, b) => {
    if (a.totalCases === b.totalCases) {
      return a.location > b.location ? 1 : -1;
    }
    return a.totalCases > b.totalCases ? -1 : 1;
  });

  return {
    staticData,
    locations: rows,
    lastUpdated
  };
};

export default scraper;
