import { fixTypos } from "./utils";
import locations from "./regions";

const processSummary = data => {
  const {
    rows,
    hospitalRows,
    transmissionRows,
    lastUpdated,
    asAt,
    summaryData,
    ...others
  } = data;

  let maxCases = 0;
  rows.forEach(item => {
    item.location = fixTypos(item.location);
    const loc = locations.find(x => item.location === x.name);
    if (!loc) {
      throw new Error(`No location "${item.location}" exist`);
    }
    maxCases = Math.max(maxCases, item.totalCases);
  });

  hospitalRows.forEach(item => {
    item.location = fixTypos(item.location);
    const loc = locations.find(x => item.location === x.name);
    if (!loc) {
      throw new Error(`No location "${item.location}" exist`);
    }
  });

  const transmissions = transmissionRows.map(item => {
    // return { ...item, percent: item.percent.replace("%", "") };
    return { ...item, percent: parseFloat(item.percent) };
  });

  // sort locations by cases descending
  rows.sort((a, b) => {
    if (a.totalCases === b.totalCases) {
      return a.location > b.location ? 1 : -1;
    }
    return a.totalCases > b.totalCases ? -1 : 1;
  });

  // clean date
  // const asAtDate = asAt.replace("As at ", "");

  const asAtDate = asAt.substr(asAt.lastIndexOf(",") + 1);

  // clean summaryData
  // for (var prop in summaryData) {
  //   if (Object.prototype.hasOwnProperty.call(summaryData, prop)) {
  //     if (isNaN(summaryData[prop].newIn24h)) {
  //       summaryData[prop].newIn24h = 0;
  //     }
  //   }
  // }

  return {
    locations: rows,
    inHospital: hospitalRows,
    transmissions,
    lastUpdated,
    asAt,
    asAtDate,
    summaryData,
    maxCases,
    ...others
  };
};
export default processSummary;
