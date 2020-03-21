import Head from "next/head";
import dynamic from "next/dynamic";
import styled from "styled-components";
import fetch from "node-fetch";
import cheerio from "cheerio";
import locations from "../constants/locations";

const URL =
  "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases";

const Map = dynamic(() => import("../components/map"), {
  ssr: false
});

const Home = ({ data, lastUpdated }) => {
  const center = { lat: -41.0495881, lng: 173.2682669 };
  const zoom = 6;

  return (
    <div className="container">
      <Head>
        <title>Covid-19 Map NZ</title>
      </Head>
      <Wrap>
        <Main>
          <Map center={center} zoom={zoom} markers={data} />
        </Main>
        <Info>
          <h1>Covid-19 Map</h1>

          <h2>Number of cases</h2>
          <table>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td>{item.location}</td>
                  <td>{item.numCases}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            <a
              href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data source - Ministry of Health
            </a>
          </p>
          {/* <p>
            <a
              href="https://covid19.govt.nz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              covid19.govt.nz
            </a>
          </p> */}
          <p>Last updated: {lastUpdated}.</p>
        </Info>
      </Wrap>
    </div>
  );
};

export default Home;

export async function getStaticProps(context) {
  const response = await fetch(URL);
  const html = await response.text();
  const $ = await cheerio.load(html);

  const lastUpdated = $(".page_updated .date").text();

  let cases = [];
  $(".table-style-two tbody tr").each((i, elem) => {
    cases.push({
      caseId: $(elem)
        .find("td:nth-child(1)")
        .text(),
      location: $(elem)
        .find("td:nth-child(2)")
        .text(),
      age: $(elem)
        .find("td:nth-child(3)")
        .text(),
      gender: $(elem)
        .find("td:nth-child(4)")
        .text(),
      details: $(elem)
        .find("td:nth-child(5)")
        .text()
    });
  });

  let data = [];
  cases.forEach(item => {
    if (item.location === "Wellington Region") {
      item.location = "Wellington";
    }
    if (item.location === "Southern DHB") {
      item.location = "Dunedin";
    }
    const n = data.find(x => item.location === x.location);
    if (n) {
      n.numCases++;
    } else {
      const loc = locations.find(x => item.location === x.location);
      if (loc) {
        data.push({
          location: item.location,
          numCases: 1,
          latlng: loc.latlng
        });
      }
    }
  });
  // console.log(summary);

  data.sort((a, b) => (a.numCases > b.numCases ? -1 : 1));

  return {
    props: {
      data,
      lastUpdated
    }
  };
}

const Wrap = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 1;
`;

const Info = styled.div`
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
`;
