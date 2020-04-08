import scraperSummary from "../data/scraperSummary";
import processSummary from "../data/processSummary";
import updateHistory from "../data/updateHistory";

const readExcel = async () => {
  var XLSX = require("xlsx");
  var workbook = XLSX.readFile("data/covid-casedeatails-7april2020.xlsx", {
    // cellDates: true,
  });
  var sheet = workbook.Sheets.Confirmed;
  var data = XLSX.utils.sheet_to_json(sheet, {
    range: 3,
  });

  // determine the date of xls

  // console.log(data);

  // const fs = require("fs");
  // let rawdata = fs.readFileSync("data/history.json");
  // let history = JSON.parse(rawdata);

  // let locs = {};
  // for (const date in history) {
  //   for (const loc in history[date]) {
  //     let locName = loc;
  //     if (locName === "Wellington Capital and Coast") {
  //       locName = "Capital and Coast";
  //     }
  //     if (locName === "Mid Central") {
  //       locName = "MidCentral";
  //     }
  //     if (locName === "Tairawhiti") {
  //       locName = "Tairāwhiti";
  //     }
  //     if (!locs[locName]) {
  //       locs[locName] = [];
  //     }
  //     locs[locName].push({
  //       date: new Date(`2020-${date}`).toJSON(),
  //       total: history[date][loc],
  //     });
  //   }
  // }
  // console.log(locs);
  // return;

  const history = await updateHistory(summary);
  console.log(history);
  return;

  // get latest date from history
  // get data date from scraper
  // scraper date is > history, add to history json
  // save to disk
  const first = history[Object.keys(history)[0]];
  const lastDateHistory = new Date(first[first.length - 1].date);
  console.log(lastDateHistory);

  const rawSummary = await scraperSummary();
  const summary = processSummary(rawSummary);
  require("datejs");
  const mohAsAtDate = Date.parse(summary.asAtDate.replace("As at ", ""));
  console.log(mohAsAtDate);

  if (mohAsAtDate > lastDateHistory) {
    summary.locations.forEach((loc) => {
      if (!history[loc.name]) {
        throw new Error(`No location "${loc.name}" exist in history.json`);
      }
      // add new entry to history.json
      history[loc.name].push({
        date: mohAsAtDate.toJSON(),
        total: loc.totalCases,
      });
    });

    // console.log(history);
    // write file to disk
    var json = JSON.stringify(history);
    fs.writeFileSync("data/history.json", json);
  }

  // const testDate = new Date();
  // console.log(testDate);
  // const testDateStr = testDate.toString();
  // console.log(testDateStr);
  // const testDateDate = new Date(testDateStr);
  // console.log(testDateDate);
  // const testDateDateStr = testDateDate.toString();
  // console.log(testDateDateStr);

  // return processed data

  return {
    // locations: [
    //   {
    //     name: "Southern",
    //     confirmed: 1,
    //     probable: 1,
    //     new: 1,
    //   },
    // ],
  };
};

export default readExcel;
