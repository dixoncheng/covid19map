import cheerio from "cheerio";
const fetch = require("@zeit/fetch-retry")(require("node-fetch"));

const URL = `https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases/covid-19-current-cases-details?${new Date()}`;
const scraperCases = async () => {
  const response = await fetch(URL);
  const html = await response.text();

  const $ = await cheerio.load(html);

  // const lastUpdated = $(".page_updated .date").text();
  // const lastUpdated = $(".field-name-body .georgia-italic")
  //   .first()
  //   .text();

  let rawCases = [];
  $("tbody")
    .eq(0)
    .find("tr")
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
        age: clean(
          $(elem)
            .find("td:nth-child(3)")
            .text()
            .trim()
        ),
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

  $("tbody")
    .eq(1)
    .find("tr")
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
        age: clean(
          $(elem)
            .find("td:nth-child(3)")
            .text()
            .trim()
        ),
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

  return rawCases;
};

export default scraperCases;

const clean = str => {
  return str.replace(/\u00a0/g, " ");
};
