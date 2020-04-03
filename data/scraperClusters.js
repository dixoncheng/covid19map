import cheerio from "cheerio";
import locations from "./regions";
import processClusters from "./processClusters";
const fetch = require("@zeit/fetch-retry")(require("node-fetch"));
import { fixTypos } from "./utils";

const URL = `https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases/covid-19-clusters?${new Date()}`;
const scraperClusters = async () => {
  const response = await fetch(URL);
  const html = await response.text();
  const $ = await cheerio.load(html);

  let rows = [];
  $(".table-style-two")
    .eq(0)
    .find("tbody tr")
    .each((i, elem) => {
      const name = $(elem)
        .find("td:nth-child(1)")
        .text()
        .trim();

      let location = $(elem)
        .find("td:nth-child(2)")
        .text()
        .trim();

      const totalCases = parseInt(
        $(elem)
          .find("td:nth-child(3)")
          .text()
          .trim()
      );

      const newCases = parseInt(
        $(elem)
          .find("td:nth-child(4)")
          .text()
          .trim()
      );

      location = fixTypos(location);

      const latlngItem = locations.find(x => location === x.name);
      if (!latlngItem) {
        throw new Error(`No location "${location}" exist`);
      }

      rows.push({
        location,
        totalCases,
        newCases,
        ...latlngItem,
        name
      });
    });

  return processClusters(rows);
};

export default scraperClusters;
