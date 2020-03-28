import scraper from "../scraper";
import scraperCases from "../scraperCases";
import api from "../api.js";

import Home from "./index";

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
