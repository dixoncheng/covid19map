import cheerio from "cheerio";
import locations from "./data/regions";
const fetch = require("@zeit/fetch-retry")(require("node-fetch"));
// import mohHtml from "./moh-html";

const URL = `https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases/covid-19-current-cases-details?${new Date()}`;
const scraperCases = async () => {
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
        date: $(elem)
          .find("td:nth-child(1)")
          .text()
          .trim(),
        location: $(elem)
          .find("td:nth-child(4)")
          .text()
          .trim(),
        age: $(elem)
          .find("td:nth-child(3)")
          .text()
          .trim(),
        gender: $(elem)
          .find("td:nth-child(2)")
          .text()
          .trim(),
        overseas: $(elem)
          .find("td:nth-child(5)")
          .text()
          .trim(),
        cityBefore: $(elem)
          .find("td:nth-child(6)")
          .text()
          .trim(),
        flightNo: $(elem)
          .find("td:nth-child(7)")
          .text()
          .trim(),
        dateDepart: $(elem)
          .find("td:nth-child(8)")
          .text()
          .trim(),
        dateArrive: $(elem)
          .find("td:nth-child(9)")
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
        date: $(elem)
          .find("td:nth-child(1)")
          .text()
          .trim(),
        location: $(elem)
          .find("td:nth-child(4)")
          .text()
          .trim(),
        age: $(elem)
          .find("td:nth-child(3)")
          .text()
          .trim(),
        gender: $(elem)
          .find("td:nth-child(2)")
          .text()
          .trim(),
        overseas: $(elem)
          .find("td:nth-child(5)")
          .text()
          .trim(),
        cityBefore: $(elem)
          .find("td:nth-child(6)")
          .text()
          .trim(),
        flightNo: $(elem)
          .find("td:nth-child(7)")
          .text()
          .trim(),
        dateDepart: $(elem)
          .find("td:nth-child(8)")
          .text()
          .trim(),
        dateArrive: $(elem)
          .find("td:nth-child(9)")
          .text()
          .trim(),
        status: "Probable"
      });
    });

  let maxCases = 0;
  let cases = [];
  let totalCasesPublished = 0;
  let countMale = 0;
  let countFemale = 0;
  let countOther = 0;
  let ages = [];

  rawCases.forEach(item => {
    if (item.location) {
      totalCasesPublished++;

      // correct typos on MOH site
      if (item.location === "Coramandel") {
        item.location = "Coromandel";
      }
      if (item.location === "Dundedin") {
        item.location = "Dunedin";
      }
      if (item.location === "Hawkes Bay") {
        item.location = "Hawke's Bay";
      }
      if (item.location === "Hawke’s Bay") {
        item.location = "Hawke's Bay";
      }
      if (item.location === "Hawkes’s Bay") {
        item.location = "Hawke's Bay";
      }
      if (item.location === "Capital & Coast") {
        item.location = "Capital and Coast";
      }
      if (item.location === "Nelson-Marlborough") {
        item.location = "Nelson Marlborough";
      }
      if (item.location === "Southern DHB") {
        item.location = "Southern";
      }
      if (item.location === "Tairawhiti") {
        item.location = "Tairāwhiti";
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
      // const age = parseInt(item.age);
      // if (!isNaN(age)) {
      //   item.age = `${Math.round(age / 10) * 10}s`;
      // }
      if (item.age === "<1" || item.age === "1 to 4" || item.age === "5 to 9") {
        item.age = "0-9";
      }

      let sortKey;
      if (item.age === "<1") {
        sortKey = 0;
        // } else if (item.age === "Teens") {
        //   sortKey = 1;
        // }
        // else if (item.age === "") {
        //   sortKey = 100;
        //   item.age = "TBC";
      } else {
        sortKey = parseInt(item.age);
      }

      const a = ages.find(x => item.age === x.title);
      if (a) {
        a.numCases++;
      } else {
        if (item.age) {
          ages.push({ title: item.age, numCases: 1, sortKey });
        }
      }

      const n = cases.find(x => item.location === x.location);
      if (n) {
        n.numCases++;
        n.cases.push(item);
        maxCases = Math.max(maxCases, n.numCases);
      } else {
        const loc = locations.find(x => item.location === x.name);
        if (loc) {
          cases.push({
            location: item.location,
            numCases: 1,
            // latlng: loc.latlng,
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

  // console.log(cases);

  return {
    cases,
    lastUpdated,
    totalCasesPublished,
    maxCases,
    countMale,
    countFemale,
    countOther,
    ages
  };
};

export default scraperCases;
