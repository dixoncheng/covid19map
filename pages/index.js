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

const Home = ({ data, lastUpdated, totalCases }) => {
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
          <img className="logo" src="/logo.svg" />
          <h1>Covid-19 Map</h1>
          <h2>Current Cases in New Zealand</h2>

          <div className="meta">
            <small>Last updated {lastUpdated}</small>
            <br />
            <small>
              Source:{" "}
              <a
                href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ministry of Health
              </a>
            </small>
          </div>

          <h2 className="split">
            Total number of cases <span>{totalCases}</span>
          </h2>

          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Case/s</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td>{item.location}</td>
                  <td>{item.numCases}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
  let totalCases = 0;
  cases.forEach(item => {
    totalCases++;
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
      lastUpdated,
      totalCases
    }
  };
}

const teal = "#51b6b0";
const green = "#aacd6e";
const light = "#edf3f0";
const dark = "#204e61";
const breakpoint = "768px";

const Wrap = styled.div`
  @media (min-width: ${breakpoint}) {
    display: flex;
  }
`;

const Main = styled.div`
  flex: 1;
`;

const Info = styled.div`
  color: ${dark};
  box-sizing: border-box;
  width: 375px;
  padding: 20px;
  background: ${light};
  @media (min-width: ${breakpoint}) {
    overflow: auto;
    height: 100vh;
  }

  a {
    color: ${dark};
  }
  .logo {
    width: 73px;
  }
  h1 {
    font-size: 42px;
    color: ${teal};
    margin: 0;
  }
  h2 {
    font-size: 23px;
    color: ${teal};
    margin: 0 0 1em;
    line-height: 1.1;
  }
  h2.split {
    display: flex;
    justify-content: space-between;
  }
  .meta {
    margin: 1.5em 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }
  td,
  th {
    font-size: 24px;
    text-align: left;
    padding: 10px 15px;
    &:last-child {
      text-align: right;
    }
  }
  th {
    background: ${green};
    color: white;
  }
  td {
    background: white;
    border-top: solid ${light} 4px;
  }
`;
