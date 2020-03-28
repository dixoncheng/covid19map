import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import scraper from "../scraper";
import scraperCases from "../scraperCases";
import api from "../api.js";
import MapView from "../components/MapView";
import Stats from "../components/Stats";

const Home = ({ data, caseDetails, casesPer1M }) => {
  const router = useRouter();
  const [view, setView] = useState(router.route === "/stats" ? "stats" : "");

  return (
    <div className="container">
      <Head>
        <title>Covid-19 Map NZ</title>
      </Head>
      {view === "stats" ? (
        <Stats
          data={data}
          caseDetails={caseDetails}
          casesPer1M={casesPer1M}
          onViewChange={() => setView("")}
        />
      ) : (
        <MapView
          data={data}
          caseDetails={caseDetails}
          onViewChange={() => setView("stats")}
        />
      )}
    </div>
  );
};

export async function getStaticProps(context) {
  const data = await scraper();
  const caseDetails = await scraperCases();
  const casesPer1M = await api();

  return {
    props: {
      data,
      caseDetails,
      casesPer1M
    }
  };
}

export default Home;
