import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import getCasesPer1m from "../data/casesPer1m.js";
// import getTimelines from "../data/timelines.js";
import scraperSummary from "../data/scraperSummary";
import processSummary from "../data/processSummary";
import scraperCases from "../data/scraperCases";
import processCases from "../data/processCases";
import scraperClusters from "../data/scraperClusters";
import processClusters from "../data/processClusters";
import { staticData } from "../data/static";
import MapView from "../components/MapView";

const Home = ({ data, caseDetails, casesPer1m }) => {
  // console.log(data);
  // console.log(caseDetails);

  const router = useRouter();
  const [view, setView] = useState(router.route === "/stats" ? "stats" : "");

  return (
    <div className="container">
      <Head>
        <title>Covid 19 Map NZ</title>
      </Head>
      <MapView
        data={data}
        caseDetails={caseDetails}
        casesPer1m={casesPer1m}
        onViewChange={() => setView("stats")}
      />
    </div>
  );
};

export async function getStaticProps(context) {
  require("datejs");

  const rawSummary = await scraperSummary();
  const rawCases = await scraperCases();
  const clusters = await scraperClusters();

  const casesPer1m = []; // await getCasesPer1m();
  // const timelines = await getTimelines();
  // console.log(timelines);

  const summary = processSummary(rawSummary);
  const caseDetails = processCases(rawCases);

  // console.log(summary.summaryData);

  const mohAsAtDate = Date.parse(summary.asAtDate.replace("As at ", ""));
  // console.log(mohAsAtDate);

  // const lastMod = fs.statSync("data/static.js");
  // console.log(lastMod.mtime);
  const staticLastUpdated = Date.parse(staticData.lastUpdated);
  // console.log(staticLastUpdated);

  staticData.dailyTotals = staticData.dailyTotals.map((item, i) => {
    return {
      days: i,
      newCases: i > 0 ? item.total - staticData.dailyTotals[i - 1].total : 0,
      ...item
    };
  });

  // console.log(summary);
  let staticDataCombined = staticData;
  // if MOH date is newer than data/static.js, use MOH summary data
  if (mohAsAtDate > staticLastUpdated) {
    if (
      isNaN(summary.summaryData.confirmedCases) ||
      isNaN(summary.summaryData.probableCases) ||
      isNaN(summary.summaryData.combinedCases) ||
      isNaN(summary.summaryData.newCases) ||
      isNaN(summary.summaryData.inHospital) ||
      isNaN(summary.summaryData.recoveredCases) ||
      isNaN(summary.summaryData.deaths)
    ) {
      throw new Error(`Summary data incomplete`);
    } else {
      staticDataCombined = { ...staticData, ...summary.summaryData };
    }
  }
  // console.log(summary.inHospital);
  summary.locations = summary.locations.map((item, i) => {
    const details = caseDetails.cases.find(x => x.name === item.name);
    const hosp = summary.inHospital.find(x => x.location === item.name);
    // if (details) {
    // return { ...item, cases: loc.cases, newCases: loc.newCases };
    return { ...item, ...details, inHospital: hosp?.totalCases || 0 };
    // }
  });
  caseDetails.cases = null;
  summary.inHospital = null;

  return {
    props: {
      data: {
        ...summary,
        staticData: staticDataCombined,
        casesPer1m,
        clusters
      },
      caseDetails
    }
  };
}

export default Home;
