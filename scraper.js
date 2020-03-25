import cheerio from "cheerio";
import locations from "./data/locations";
const fetch = require("@zeit/fetch-retry")(require("node-fetch"));
// import mohHtml from "./moh-html";
import staticData from "./data/static";

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

  let rawCases = [];
  $(".table-style-two")
    .eq(0)
    .find("tbody tr")
    .each((i, elem) => {
      rawCases.push({
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
          .trim(),
        status: "Confirmed"
      });
    });

  $(".table-style-two")
    .eq(1)
    .find("tbody tr")
    .each((i, elem) => {
      rawCases.push({
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
          .trim(),
        status: "Probable"
      });
    });

  let cases = [];
  let totalCases = 0;
  let countMale = 0;
  let countFemale = 0;
  let countOther = 0;
  let ages = [];

  rawCases.forEach(item => {
    if (item.location) {
      totalCases++;

      // correct typos on MOH site
      if (item.location === "Coramandel") {
        item.location = "Coromandel";
      }
      if (item.location === "Dundedin") {
        item.location = "Dunedin";
      }
      if (item.location === "Hawkes Bay") {
        item.location = "Hawke’s Bay";
      }

      // normalize genders
      if (item.gender === "M") {
        item.gender = "Male";
      }
      if (item.gender === "F") {
        item.gender = "Female";
      }
      if (item.gender === "Not provided") {
        item.gender = "";
      }

      if (item.gender === "Male") {
        countMale++;
      } else if (item.gender === "Female") {
        countFemale++;
      } else {
        countOther++;
      }

      // normalize ages
      const age = parseInt(item.age);
      if (!isNaN(age)) {
        item.age = `${Math.round(age / 10) * 10}s`;
      }

      let sortKey;
      if (item.age === "Child") {
        sortKey = 0;
      } else if (item.age === "Teens") {
        sortKey = 1;
      } else if (item.age === "") {
        sortKey = 100;
        item.age = "TBC";
      } else {
        sortKey = parseInt(item.age);
      }

      const a = ages.find(x => item.age === x.title);
      if (a) {
        a.numCases++;
      } else {
        ages.push({ title: item.age, numCases: 1, sortKey });
      }

      const n = cases.find(x => item.location === x.location);
      if (n) {
        n.numCases++;
        n.cases.push(item);
      } else {
        const loc = locations.find(x => item.location === x.location);
        if (loc) {
          cases.push({
            location: item.location,
            numCases: 1,
            latlng: loc.latlng,
            cases: [item]
          });
        } else {
          if (item.location !== "TBC") {
            // region doesn't exist in constants
            throw new Error(`No location "${item.location}" exist`);
          }
        }
      }
    }
  });

  ages.sort((a, b) => {
    return a.sortKey < b.sortKey ? -1 : 1;
  });

  cases.sort((a, b) => {
    if (a.numCases === b.numCases) {
      return a.location > b.location ? 1 : -1;
    }
    return a.numCases > b.numCases ? -1 : 1;
  });

  return {
    staticData,
    cases,
    lastUpdated,
    totalCases,
    countMale,
    countFemale,
    countOther,
    ages
  };
};

export default scraper;
