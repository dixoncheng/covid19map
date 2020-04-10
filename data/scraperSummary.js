import cheerio from "cheerio";
import locations from "./regions";
const fetch = require("@zeit/fetch-retry")(require("node-fetch"));
import { fixTypos } from "./utils";

const URL = `https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases?${new Date()}`;
const scraper = async () => {
  const response = await fetch(URL);
  const html = await response.text();
  const $ = await cheerio.load(html);

  // const lastUpdated = $(".page_updated .date").text();
  const lastUpdated = $(".field-name-body .georgia-italic").first().text();

  const asAt = $(".table-style-two").eq(0).find("caption").text();

  let summaryData = {};
  $(".table-style-two")
    .eq(0)
    .find("tbody tr")
    .each((i, elem) => {
      const totalToDate = $(elem).find("td:nth-child(2)").text().trim();
      const newIn24h = $(elem).find("td:nth-child(3)").text().trim();

      if (i === 0) {
        // summaryData.confirmedCases = { totalToDate, newIn24h };
        summaryData.confirmedCases = totalToDate;
        summaryData.confirmedCasesNew = newIn24h;
        // summaryData.newCases = (newIn24h);
      }
      if (i === 1) {
        // summaryData.probableCases = { totalToDate, newIn24h };
        summaryData.probableCases = totalToDate;
        summaryData.probableCasesNew = newIn24h;
      }
      if (i === 2) {
        // summaryData.combinedCases = { totalToDate, newIn24h };
        summaryData.combinedCases = totalToDate;
        summaryData.combinedCasesNew = newIn24h;
      }
      if (i === 3) {
        // summaryData.inHospital = { totalToDate, newIn24h };
        summaryData.inHospital = totalToDate;
        summaryData.inHospitalNew = newIn24h;
      }
      if (i === 4) {
        // summaryData.recoveredCases = { totalToDate, newIn24h };
        summaryData.recoveredCases = totalToDate;
        summaryData.recoveredCasesNew = newIn24h;
      }
      if (i === 5) {
        // summaryData.deaths = { totalToDate, newIn24h };
        summaryData.deaths = totalToDate;
        summaryData.deathsNew = newIn24h;
      }
    });

  let hospitalRows = [];
  $(".table-style-two")
    .eq(1)
    .find("tbody tr")
    .each((i, elem) => {
      let location = $(elem).find("td:nth-child(1)").text().trim();

      const totalCases = parseInt(
        $(elem).find("td:nth-child(2)").text().trim()
      );

      location = fixTypos(location);

      if (location && location !== "Total" && totalCases > 0) {
        // const latlngItem = locations.find(x => location === x.name);
        // if (!latlngItem) {

        //   throw new Error(`No location "${location}" exist`);
        // }

        hospitalRows.push({
          location,
          totalCases,
          // ...latlngItem
        });
      }
    });

  let rows = [];
  $(".table-style-two")
    .eq(2)
    .find("tbody tr")
    .each((i, elem) => {
      let location = $(elem).find("td:nth-child(1)").text().trim();

      const totalCases = parseInt(
        $(elem).find("td:nth-child(2)").text().trim()
      );

      const newCases = parseInt($(elem).find("td:nth-child(3)").text().trim());

      location = fixTypos(location);
      if (location && location !== "Total" && totalCases > 0) {
        const latlngItem = locations.find((x) => location === x.name);
        if (!latlngItem) {
          throw new Error(`No location "${location}" exist`);
        }

        // const confirmedCases = parseInt(
        //   $(elem)
        //     .find("td:nth-child(2)")
        //     .text()
        //     .trim()
        // );

        // const probableCases = parseInt(
        //   $(elem)
        //     .find("td:nth-child(3)")
        //     .text()
        //     .trim()
        // );

        rows.push({
          location,
          // confirmedCases,
          // probableCases,
          totalCases,
          newCases,
          ...latlngItem,
        });
      }
    });

  let transmissionRows = [];
  $(".table-style-two")
    .eq(3)
    .find("tbody tr")
    .each((i, elem) => {
      const type = $(elem).find("td:nth-child(1)").text().trim();
      const percent = $(elem).find("td:nth-child(2)").text().trim();

      transmissionRows.push({ type, percent });
    });

  return {
    rows,
    hospitalRows,
    transmissionRows,
    lastUpdated,
    asAt,
    summaryData,
  };
};

export default scraper;
