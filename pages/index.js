import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import api from "../api.js";
import scraperSummary from "../data/scraperSummary";
import scraperCases from "../data/scraperCases";
import processSummary from "../data/processSummary";
import processCases from "../data/processCases";
import { staticData } from "../data/static";
import MapView from "../components/MapView";

const Home = ({ data, caseDetails, casesPer1M }) => {
  const router = useRouter();
  const [view, setView] = useState(router.route === "/stats" ? "stats" : "");

  return (
    <div className="container">
      <Head>
        <title>Covid-19 Map NZ</title>
      </Head>
      <MapView
        data={data}
        caseDetails={caseDetails}
        casesPer1M={casesPer1M}
        onViewChange={() => setView("stats")}
      />
    </div>
  );
};

export async function getStaticProps(context) {
  // const fs = require("fs");
  require("datejs");

  const rawSummary = await scraperSummary();
  const rawCases = await scraperCases();
  // const casesPer1M = await api();

  const summary = processSummary(rawSummary);
  const caseDetails = processCases(rawCases);

  // console.log(summary.summaryData);

  const mohAsAtDate = Date.parse(summary.asAt.replace("As at ", ""));
  console.log(mohAsAtDate);

  // const lastMod = fs.statSync("data/static.js");
  // console.log(lastMod.mtime);
  const staticLastUpdated = Date.parse(staticData.lastUpdated);
  console.log(staticLastUpdated);

  let staticDataCombined = staticData;
  // if MOH date is newer than data/static.js, use MOH summary data
  if (mohAsAtDate > staticLastUpdated) {
    staticDataCombined = { ...staticData, ...summary.summaryData };
  }
  summary.locations = summary.locations.map((item, i) => {
    const loc = caseDetails.cases.find(x => x.name === item.name);
    if (loc) {
      // return { ...item, cases: loc.cases, newCases: loc.newCases };
      return { ...item, ...loc };
    }
  });
  caseDetails.cases = null;

  return {
    props: {
      data: { ...summary, staticData: staticDataCombined },
      caseDetails,
      casesPer1M: []
    }
  };
}

export default Home;
