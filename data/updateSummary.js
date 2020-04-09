const updateSummary = async (summary) => {
  const fs = require("fs");
  let rawdata = fs.readFileSync("data/summary.json");
  let totals = JSON.parse(rawdata);

  // for (let i = 0; i < totals.length; i++) {
  //   const {
  //     date,
  //     confirmedTotal,
  //     probableTotal,
  //     combined,
  //     confirmed,
  //     probable,
  //     hospital,
  //     ...item
  //   } = totals[i];
  //   const combinedTotal =
  //     (i < 1 ? 0 : totals[i - 1].combinedTotal) + item.combined;
  //   // const confirmedTotal =
  //   //   (i < 1 ? 0 : totals[i - 1].confirmedTotal) + item.confirmed;
  //   // const probableTotal =
  //   //   (i < 1 ? 0 : totals[i - 1].probableTotal) + item.probable;
  //   const combinedRecovered =
  //     (i < 1 ? 0 : totals[i - 1].combinedRecovered) + item.recovered;

  //   // return { date, combinedTotal, confirmedTotal, probableTotal, ...item };

  //   totals[i] = {
  //     date,
  //     combinedTotal,
  //     confirmedTotal: 0,
  //     probableTotal: 0,
  //     combined: 0,
  //     confirmed: 0,
  //     probable: 0,
  //     hospital: 0,
  //     combinedRecovered,
  //     ...item,
  //   };
  // }
  // console.log(totals);
  // return;

  // totals = totals.map(({ date, ...item }, i) => {
  //   // const dateArr = date.split("/");
  //   // date = new Date(`${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`);
  //   console.log(totals[i - 1]);
  //   console.log("------");

  //   const combinedTotal =
  //     (i < 1 ? 0 : totals[i - 1].combinedTotal) + item.combined;
  //   const confirmedTotal =
  //     (i < 1 ? 0 : totals[i - 1].confirmedTotal) + item.confirmed;
  //   const probableTotal =
  //     (i < 1 ? 0 : totals[i - 1].probableTotal) + item.probable;

  //   return { date, combinedTotal, confirmedTotal, probableTotal, ...item };
  // });
  // var json = JSON.stringify(totals);
  // fs.writeFileSync("data/totals.json", json);
  // console.log(totals);
  // console.log("done");
  // return;

  // get latest date from totals
  // get data date from scraper
  // if scraper date is > totals, add to totals json
  // save to disk
  const lastDate = new Date(totals[totals.length - 1].date);
  // console.log(lastDate);

  require("datejs");
  const mohAsAtDate = Date.parse(summary.asAtDate.replace("As at ", ""));
  // console.log(mohAsAtDate);

  // console.log(summary.summaryData);

  if (mohAsAtDate > lastDate) {
    const {
      confirmedCases,
      probableCases,
      combinedCases,
      inHospital,
      recoveredCases,
      deaths,
      confirmedCasesNew,
      probableCasesNew,
      combinedCasesNew,
      inHospitalNew,
      recoveredCasesNew,
      deathsNew,
    } = summary.summaryData;

    // for (const field in summary.summaryData) {
    //   if (isNaN(summary.summaryData[field])) {
    //     throw new Error(`Summary data incomplete (${field})`);
    //   }
    // }

    // add new entry to history.json
    totals.push({
      date: mohAsAtDate.toJSON(),
      combinedTotal: combinedCases,
      confirmedTotal: confirmedCases,
      probableTotal: probableCases,
      combined: combinedCasesNew,
      confirmed: confirmedCasesNew,
      probable: probableCasesNew,
      hospital: inHospitalNew,
      hospitalTotal: inHospital,
      recoveredTotal: recoveredCases,
      recovered: recoveredCasesNew,
      deaths: deathsNew,
      deathsTotal: deaths,
    });

    // console.log(totals);
    // write file to disk
    var json = JSON.stringify(totals);
    fs.writeFileSync("data/summary.json", json);
  }

  return totals;
};

export default updateSummary;
