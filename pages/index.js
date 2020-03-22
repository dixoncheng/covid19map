import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";
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

  const [view, setView] = useState("");
  const [location, setLocation] = useState();

  const showLocation = location => {
    const loc = data.find(x => location === x.location);
    if (loc) {
      setLocation(loc);
      setView("details");
    }
  };

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
          {view === "details" ? (
            <Details>
              <BackButton type="button" onClick={() => setView("")}>
                &lt; Back to summary
              </BackButton>

              <Bar>
                {location.location}
                <span>
                  {location.numCases}{" "}
                  {location.numCases === 1 ? "Case" : "Cases"}
                </span>
              </Bar>

              {location?.cases.map((item, i) => (
                <Case key={i}>
                  <h3>Case {item.caseId}</h3>
                  <div className="details">
                    <div className="age">
                      {item.age}
                      {item.age && item.gender ? ", " : ""} {item.gender}
                    </div>
                    {item.details}
                  </div>
                </Case>
              ))}
            </Details>
          ) : (
            <Summary>
              <Alert>Alert Level 2</Alert>
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

              <Bar>
                Location
                <span>Case/s</span>
              </Bar>
              {data.map((item, i) => (
                <Location
                  key={i}
                  type="button"
                  onClick={() => showLocation(item.location)}
                >
                  {item.location}
                  <span>{item.numCases}</span>
                </Location>
              ))}

              <p>
                <small>
                  Any feedback, ideas, or if you'd like to help, please contact{" "}
                  <a href="mailto:contact@covid19map.nz">
                    contact@covid19map.nz
                  </a>{" "}
                  |{" "}
                  <a
                    href="https://github.com/dixoncheng/covid19map"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                </small>
              </p>
              <p>
                <small>
                  Covid-19 Map NZ sources its data directly from the official{" "}
                  <a
                    href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ministry of Health page
                  </a>
                  . We are in no way responsible for the accuracy of this
                  information.
                </small>
              </p>
              <p>
                <small>
                  Covid-19 Map NZ disclaims and excludes all liability for any
                  claim, loss, demand or damages of any kind whatsoever
                  (including for negligence) arising out of or in connection
                  with the use of either this website or the information,
                  content or materials included on this site or on any website
                  we link to.
                </small>
              </p>
              <p>
                <small>
                  By viewing and using the site, you will be deemed to agree to
                  these Terms of use.
                </small>
              </p>
            </Summary>
          )}
        </Info>
      </Wrap>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const response = await fetch(URL);
  const html = await response.text();
  const $ = await cheerio.load(html);

  const lastUpdated = $(".page_updated .date").text();

  let cases = [];
  $(".table-style-two tbody tr").each((i, elem) => {
    cases.push({
      caseId: $(elem)
        .find("td:nth-child(1)")
        .text()
        .trim(),
      location: $(elem)
        .find("td:nth-child(2)")
        .text()
        .trim(),
      age: $(elem)
        .find("td:nth-child(3)")
        .text()
        .trim(),
      gender: $(elem)
        .find("td:nth-child(4)")
        .text()
        .trim(),
      details: $(elem)
        .find("td:nth-child(5)")
        .text()
        .trim()
    });
  });

  let data = [];
  let totalCases = 0;
  cases.forEach(item => {
    totalCases++;

    // correct typos on MOH site
    if (item.location === "Coramandel") {
      item.location = "Coromandel";
    }
    if (item.location === "Dundedin") {
      item.location = "Dunedin";
    }

    // normalize genders
    if (item.gender === "M") {
      item.gender = "Male";
    }
    if (item.gender === "F") {
      item.gender = "Female";
    }

    const n = data.find(x => item.location === x.location);
    if (n) {
      n.numCases++;
      n.cases.push(item);
    } else {
      const loc = locations.find(x => item.location === x.location);
      if (loc) {
        data.push({
          location: item.location,
          numCases: 1,
          latlng: loc.latlng,
          cases: [item]
        });
      } else {
        // region doesn't exist in constants
        throw new Error(`No region ${item.location} exist`);
      }
    }
  });

  data.sort((a, b) => {
    if (a.numCases === b.numCases) {
      return a.location > b.location ? 1 : -1;
    }
    return a.numCases > b.numCases ? -1 : 1;
  });

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
const sm = "700px";
const md = "800px";

const Wrap = styled.div`
  @media (min-width: ${sm}) {
    display: flex;
  }
`;

const Main = styled.div`
  flex: 1;
`;

const Info = styled.div`
  color: ${dark};
  box-sizing: border-box;
  padding: 20px;
  background: ${light};
  @media (min-width: ${sm}) {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    height: 100vh;
    width: 375px;
  }
  a {
    color: ${dark};
  }
`;

const Summary = styled.div`
  .logo {
    width: 40px;
    @media (min-width: ${md}) {
      width: 73px;
    }
  }
  h1 {
    font-size: 30px;
    color: ${teal};
    margin: 0;
    @media (min-width: ${md}) {
      font-size: 42px;
    }
  }
  h2 {
    font-size: 18px;
    color: ${teal};
    margin: 0 0 1em;
    line-height: 1.1;
    @media (min-width: ${md}) {
      font-size: 23px;
    }
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
    padding: 7px 15px;
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

const Location = styled.button`
  text-decoration: underline;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  background: white;
  padding: 7px 15px;
  margin-top: 4px;
  border: none;
  width: 100%;
  transition: 0.3s ease;
  color: ${dark};
  @media (min-width: ${md}) {
    font-size: 24px;
  }
  :hover {
    background: #bee1dd;
  }
`;

const Details = styled.div``;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  background: ${green};
  color: white;
  padding: 7px 15px;
  @media (min-width: ${md}) {
    font-size: 24px;
  }
`;

const Case = styled.div`
  font-size: 14px;
  margin-top: 4px;
  h3 {
    margin: 0;
    font-size: 14px;
    color: white;
    background: ${teal};
    padding: 2px 15px;
  }
  .age {
    color: ${teal};
  }
  .details {
    background: white;
    padding: 10px 15px;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${dark};
  margin-bottom: 1.5em;
  padding: 0;
`;

const Alert = styled.div`
  padding: 5px 20px;
  color: white;
  font-size: 24px;
  background: #ffcd38 url(/alert.svg) 174px 50% no-repeat;
  margin: -20px -20px 20px;
`;
