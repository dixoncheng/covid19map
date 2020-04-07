const updateHistory = async (summary) => {
  const fs = require("fs");
  let rawdata = fs.readFileSync("data/history.json");
  let history = JSON.parse(rawdata);

  // get latest date from history
  // get data date from scraper
  // if scraper date is > history, add to history json
  // save to disk
  const first = history[Object.keys(history)[0]];
  const lastDateHistory = new Date(first[first.length - 1].date);
  //   console.log(lastDateHistory);

  require("datejs");
  const mohAsAtDate = Date.parse(summary.asAtDate.replace("As at ", ""));
  //   console.log(mohAsAtDate);

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

  return history;
};

export default updateHistory;
