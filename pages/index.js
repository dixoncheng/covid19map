import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
// import getCasesPer1m from "../data/casesPer1m.js";
// import getTimelines from "../data/timelines.js";
import scraperSummary from "../data/scraperSummary";
import processSummary from "../data/processSummary";
import scraperCases from "../data/scraperCases";
import processCases from "../data/processCases";
import scraperClusters from "../data/scraperClusters";
import MapView from "../components/MapView";
import updateHistory from "../data/updateHistory";
import updateSummary from "../data/updateSummary";

const Home = ({ data }) => {
  // console.log(data);

  const router = useRouter();
  const [view, setView] = useState(router.route === "/stats" ? "stats" : "");

  return (
    <div className="container">
      <Head>
        <title>Covid 19 Map NZ</title>
      </Head>
      <MapView data={data} onViewChange={() => setView("stats")} />
    </div>
  );
};

export async function getStaticProps(context) {
  const rawSummary = await scraperSummary();
  const rawCases = await scraperCases();
  const clusters = await scraperClusters();

  const casesPer1m = []; // await getCasesPer1m();
  // const timelines = await getTimelines();

  const summary = processSummary(rawSummary);
  const caseDetails = processCases(rawCases);

  summary.locations = summary.locations.map((item, i) => {
    const details = caseDetails.cases.find((x) => x.name === item.name);
    const hosp = summary.inHospital.find((x) => x.location === item.name);
    // if (details) {
    // return { ...item, cases: loc.cases, newCases: loc.newCases };
    return {
      ...item,
      cases: details.cases,
      ...details,
      inHospital: hosp?.totalCases || 0,
    };
    // }
  });
  caseDetails.cases = null;
  summary.inHospital = null;

  const history = await updateHistory(summary);
  const summ = await updateSummary(summary);

  return {
    props: {
      data: {
        alertLevel: 4,
        ...summary,
        summary: summ,
        casesPer1m,
        clusters,
        history,
        caseDetails,
      },
    },
  };
}

export default Home;
