import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import styled, { css } from "styled-components";
import Row from "../components/Row";
import TotalCases from "../components/TotalCases";
import Cases from "../components/Cases";
import NewCases from "../components/NewCases";
import Deaths from "../components/Deaths";
import Recovered from "../components/Recovered";
import Hospital from "../components/Hospital";
import Genders from "../components/Genders";
import TotalChart from "../components/TotalChart";
import DailyChart from "../components/DailyChart";
import Ages from "../components/Ages";
import Terms from "../components/Terms";
import TransmissionChart from "../components/TransmissionChart";
import Tests from "../components/Tests";

import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const center = { lat: -41.0495881, lng: 173.2682669 };
const zoom = 6;
const outerBounds = [
  [-28.00178557, 160.67596054],
  [-51.57478991, 183.27441406],
];
const innerBounds = [
  [-34.76671725, 166.2361908],
  [-47.30251579, 177.66849518],
];

const MapView = ({ data = {}, error }) => {
  const infoRef = useRef();
  const detailsRef = useRef();

  const {
    locations,
    clusters,
    asAt,
    maxCases,
    history,
    alertLevel,
    summary,
    transmissions,
    testingData,
    genders,
    ages,
  } = data;
  const {
    combinedTotal,
    confirmedTotal,
    probableTotal,
    combined,
    deathsTotal,
    recoveredTotal,
    hospitalTotal,
  } = summary ? summary[summary.length - 1] : {};

  const [view, setView] = useState("");
  const [location, setLocation] = useState("");
  const [termsOpened, setTermsOpened] = useState(false);

  const showLocation = (location) => {
    if (location) {
      const loc = locations.find((x) => location === x.name);
      setLocation(loc);
      setView("details");
    } else {
      setView("");
    }

    infoRef.current.scrollTop = 0;
    // window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (detailsRef.current) {
      if (window.scrollY > detailsRef.current.offsetTop) {
        window.scrollTo(0, detailsRef.current.offsetTop - 20);
      }
    }
  }, [view]);

  return (
    <Wrap>
      <Main>
        <Map
          center={center}
          zoom={zoom}
          markers={locations}
          clusters={clusters}
          currentView={view}
          onMarkerClick={showLocation}
          maxCases={maxCases}
          outerBounds={outerBounds}
          innerBounds={innerBounds}
        />
      </Main>
      <Info ref={infoRef}>
        {view === "details" ? (
          <Details ref={detailsRef}>
            <BackButton
              type="button"
              onClick={() => {
                setView("");
                infoRef.current.scrollTo(0, 0);
              }}
            >
              &lt; Back to summary
            </BackButton>

            <Bar>
              {location.location}
              <span>
                {location.totalCases}{" "}
                {location.totalCases === 1 ? "Case" : "Cases"}
              </span>
            </Bar>

            {location?.cases?.map(
              (
                { status, date, age, gender, cityBefore, flightNo, dateArrive },
                i
              ) => (
                <Case key={i} status={status}>
                  <h3>
                    {status}: {date}
                  </h3>
                  <div className="details">
                    <div className="age">
                      {age && <>Age {age}</>}
                      {age && gender ? ", " : ""} {gender}
                    </div>
                    {(dateArrive || cityBefore || flightNo) && (
                      <>
                        Arrived {dateArrive && <>on {dateArrive}</>}{" "}
                        {cityBefore && <>from {cityBefore}</>}{" "}
                        {flightNo && <>({flightNo})</>}
                      </>
                    )}
                    {/* {details.split(/\r?\n/).map((item, i) => (
                        <div key={i}>{item}</div>
                      ))} */}
                  </div>
                </Case>
              )
            )}

            {!location.cases && (
              <p style={{ textAlign: "center" }}>
                <small>Details yet to be released</small>
              </p>
            )}

            {location.numCases < location.totalCases && (
              <p style={{ textAlign: "center" }}>
                <small>
                  Details of {location.totalCases - location.numCases} cases yet
                  to be released
                </small>
              </p>
            )}
          </Details>
        ) : (
          <Summary>
            <Alert
              href="https://covid19.govt.nz/assets/resources/tables/COVID-19-alert-levels-summary.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alert Level 4
            </Alert>
            <Logo>
              <img className="logo" src="/logo.svg" />
              <div>
                <h1>Covid19map.nz</h1>
                <h2>Current Cases in New Zealand</h2>
              </div>
            </Logo>
            {data.locations && (
              <>
                <div className="meta">
                  <div>
                    <small>{asAt}</small>
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
                  <div>
                    <Refresh
                      type="button"
                      onClick={() =>
                        (window.location = `/?${new Date().getTime()}`)
                      }
                    >
                      <div
                        className="inline-icon"
                        dangerouslySetInnerHTML={{
                          __html: require(`../public/refresh.svg?include`),
                        }}
                      />
                      Refresh
                    </Refresh>
                  </div>
                </div>
                <Share>
                  <small>Share:</small>
                  <a
                    href="https://www.facebook.com/sharer/sharer.php?u=https://covid19map.nz/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/fb.svg" />
                  </a>
                  <a
                    href="http://www.twitter.com/share?url=https://covid19map.nz/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/tw.svg" />
                  </a>
                </Share>
                <Row>
                  <TotalCases combinedTotal={combinedTotal} />
                </Row>
                <Row>
                  <Cases
                    confirmedTotal={confirmedTotal}
                    probableTotal={probableTotal}
                    active={combinedTotal - recoveredTotal - deathsTotal}
                  />
                </Row>
                <Row>
                  <div className="grid">
                    <NewCases combined={combined} />
                    <Deaths deathsTotal={deathsTotal} />
                  </div>
                </Row>
                <Row>
                  <Recovered
                    recoveredTotal={recoveredTotal}
                    combinedTotal={combinedTotal}
                  />
                </Row>
                <Row>
                  <div className="grid">
                    <Hospital hospitalTotal={hospitalTotal} />
                    {genders && <Genders genders={genders} />}
                  </div>
                </Row>
                {testingData && (
                  <Row>
                    <Tests tests={testingData.yesterdayTotal} />
                  </Row>
                )}
                <Row>
                  <TotalChart summary={summary} />
                </Row>
                <Row>
                  <DailyChart summary={summary} />
                </Row>
                <Row>
                  <TransmissionChart data={transmissions} />
                </Row>
                {/* <Bar>
                  Location
                  <span>Daily cases</span>
                </Bar> */}

                <Heading>Regional data</Heading>
                <Legend>
                  <ul>
                    <li>
                      <img src="/active.svg" /> Total Cases
                    </li>
                    <li>
                      <img src="/recovered.svg" />
                      Recovered
                    </li>
                    <li>
                      <img src="/deaths.svg" />
                      Deaths
                    </li>
                  </ul>
                </Legend>
                {locations?.map((item, i) => (
                  <Location
                    key={i}
                    onClick={() => {
                      showLocation(item.location);
                    }}
                  >
                    <div className="body">
                      <div>
                        <span className="name">{item.location}</span>
                        <CaseCounts>
                          <ul>
                            <li>
                              <img src="/active.svg" /> {item.totalCases}
                            </li>
                            <li>
                              <img src="/recovered.svg" />{" "}
                              {
                                history[item.name][
                                  history[item.name].length - 1
                                ].recovered
                              }
                            </li>
                            <li>
                              <img src="/deaths.svg" />{" "}
                              {
                                history[item.name][
                                  history[item.name].length - 1
                                ].deaths
                              }
                            </li>
                          </ul>
                        </CaseCounts>
                      </div>
                      <div className="num-cases">
                        <div className="total-cases">
                          {
                            history[item.name][history[item.name].length - 1]
                              .active
                          }
                        </div>
                        {item.newCases > 0 && <small>+{item.newCases}</small>}
                        {/* <div
                        className="inline-icon"
                        dangerouslySetInnerHTML={{
                          __html: require(`../public/arrow.svg?include`),
                        }}
                      /> */}
                      </div>
                    </div>

                    <InlineChart>
                      <ResponsiveContainer>
                        <LineChart data={history[item.name]}>
                          <XAxis dataKey="date" hide />
                          <Line
                            type="monotone"
                            dataKey="new"
                            stroke="#51b6b0"
                            strokeWidth={1}
                            dot={false}
                            isAnimationActive={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </InlineChart>
                  </Location>
                ))}
                {ages && (
                  <Row>
                    <Ages ages={ages} />
                  </Row>
                )}
                <Terms
                  termsOpened={termsOpened}
                  setTermsOpened={setTermsOpened}
                />
              </>
            )}
            {error && (
              <Error type="button" onClick={() => window.location.reload()}>
                Having trouble retrieving data, please <strong>refresh</strong>.
              </Error>
            )}
          </Summary>
        )}
      </Info>
    </Wrap>
  );
};

export default MapView;

const Wrap = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${theme.sm}) {
      display: flex;
    }
  `}
`;

const Main = styled.div`
  flex: 1;
`;

const Info = styled.div`
  ${({ theme }) => css`
    font-size: 2vw;

    color: ${theme.dark};
    box-sizing: border-box;
    padding: 20px;
    background: ${theme.light};
    @media (min-width: ${theme.sm}) {
      font-size: 0.45em;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      height: 100vh;
      width: 375px;
    }
    a {
      color: ${theme.dark};
    }
  `}
`;

const Summary = styled.div`
  ${({ theme }) => css`
    h2 {
      font-size: 18px;
      color: ${theme.teal};
      margin: 0;
      line-height: 1.1;
      @media (min-width: ${theme.md}) {
        font-size: 23px;
      }
    }
    .total {
      margin-bottom: 1.5em;
    }
    h2 + .cases-breakdown {
      margin-top: 1px;
    }
    .cases-breakdown + h2 {
      margin-top: 0.5em;
    }
    .cases-breakdown {
      display: flex;
      justify-content: space-between;
    }
    h2.split {
      display: flex;
      justify-content: space-between;
    }
    .meta {
      font-size: 2em;
      margin: 0.5em 0;
      display: flex;
      justify-content: space-between;
    }
  `}
`;

const Logo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    img {
      width: 6em;
      margin-right: 1.5em;
      /* @media (min-width: ${theme.md}) {
        width: 60px;
      } */
    }
    h1 {
      white-space: nowrap;
      font-size: 4.5em;
      color: ${theme.teal};
      margin: 0;
      /* @media (min-width: ${theme.md}) {
        font-size: 36px;
      } */
    }
    h2 {
      white-space: nowrap;
      font-size: 2em;
      color: ${theme.teal};
      margin: 0;
      line-height: 1.1;
      /* @media (min-width: ${theme.md}) {
        font-size: 18px;
      } */
    }
  `}
`;

const SummaryTable = styled.table`
  ${({ theme, cols }) => css`
    width: 100%;
    border-collapse: collapse;

    tr:hover td {
      transition: 0.3s ease;
      background: #bee1dd;
    }
    td,
    th {
      line-height: 1.2;
      text-align: center;
      font-size: 16px;
      padding: 7px;
      &:first-child {
        text-align: left;
        padding-left: 15px;
      }
      ${cols === 2 &&
      css`
        /* font-size: 20px; */
        &:last-child {
          text-align: right;
          padding-right: 15px;
        }
      `}
    }
    th {
      background: ${theme.green};
      color: white;
    }
    td {
      cursor: pointer;
      background: white;
      border-top: solid ${theme.light} 4px;
      padding-top: 0;
      padding-bottom: 0;
      white-space: nowrap;
      small {
        color: ${theme.green};
        margin-right: 1em;
      }
    }
    .name-wrap {
      display: flex;
      align-items: center;
    }
    .inline-icon {
      /* opacity: 0.3; */
    }
    small {
      font-weight: bold;
    }
  `}
`;

const Details = styled.div``;

const Bar = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    background: ${theme.green};
    color: white;
    padding: 7px 10px;
    margin: 0 !important;
    /* @media (min-width: ${theme.md}) {
      font-size: 20px;
    } */
    span {
      text-align: right;
    }
  `}
`;

const Case = styled.div`
  ${({ theme, status }) => css`
    font-size: 14px;
    margin-top: 4px;
    h3 {
      margin: 0;
      font-size: 14px;
      color: white;
      background: ${theme.teal};
      padding: 2px 15px;
      ${status === "Probable" &&
      css`
        background: ${theme.green};
      `}
    }
    .age {
      color: ${theme.teal};
      ${status === "Probable" &&
      css`
        color: ${theme.green};
      `}
    }
    .details {
      background: white;
      padding: 10px 15px;
    }
  `}
`;

const BackButton = styled.button`
  ${({ theme }) => css`
    background: none;
    border: none;
    color: ${theme.dark};
    margin-bottom: 1.5em;
    padding: 0;
    font-size: 14px;
  `}
`;

const Alert = styled.a`
  padding: 3px 20px;
  color: white !important;
  font-size: 14px;
  background: #ffcd38 url(/alert.svg) 100% 50% no-repeat;
  margin: -20px -20px 10px;
  display: block;
`;

const Share = styled.div`
  margin-bottom: 0.8em;
  font-size: 2em;
  img {
    height: 1.2em;
    vertical-align: middle;
    margin: 0 3px;
    position: relative;
    top: -1px;
  }
`;

const Location = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    font-size: 2.1em;
    background: white;
    padding: 0.2em 0.5em 0.2em;
    margin: 5px 0 !important;
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    transition: 0.3s ease;

    :hover {
      background: #bee1dd;
    }
    .body {
      padding: 6px 0;
      /* width: 50%; */
      flex: 1;
      display: flex;
      justify-content: space-between;
      /* align-items: center; */
    }
    .name {
      color: ${theme.teal};
      /* font-weight: bold; */
    }
    .num-cases {
      color: ${theme.teal};
      font-weight: bold;
      /* padding-top: 3px;
      line-height: 1; */
      margin: 0 10px;
      text-align: right;
      /* display: flex;
      flex-direction: column;
      justify-content: center; */
      /* align-items: center; */
      /* position: relative; */
      /* top: 1px; */
    }
    .inline-icon {
      /* opacity: 0.3; */
    }
    .total-cases {
      /* font-size: 1em; */
    }
    small {
      display: inline-block;
      background: ${theme.green};
      font-size: 0.8em;
      font-weight: bold;
      color: white;
      padding: 0.15em 0.3em;
      border-radius: 0.3em;
      text-align: right;
      position: relative;
      top: -3px;
      line-height: 1;
    }
  `}
`;

const InlineChart = styled.div`
  width: 45%;
  height: 50px;
  /* margin-left: 5px;
  display: inline-block; */
`;

const Error = styled.button`
  ${({ theme }) => css`
    font-size: 1em;
    margin-top: 50px;
    text-align: center;
    padding: 0 40px;
    border: none;
    background: none;
    strong {
      color: ${theme.teal};
    }
  `}
`;

const Refresh = styled.button`
  ${({ theme }) => css`
    border: none;
    background: ${theme.green};
    color: white;
    font-size: 0.8em;
    padding: 0.1em 0.5em;
    border-radius: 1em;
    .inline-icon {
      position: relative;
      top: 1px;
      width: 1em;
      height: 1em;
      margin-right: 0.2em;
    }
  `}
`;

const Heading = styled.div`
  ${({ theme }) => css`
    color: ${theme.dark};
    font-family: ${theme.fontFancy};
    font-size: 2.1em;
    text-transform: uppercase;
    margin-top: 1.6em;
    margin-bottom: 0.3em;
    line-height: 1.1;
  `}
`;

const Legend = styled.div`
  ${({ theme }) => css`
    margin-bottom: 0.3em;
    font-size: 2.1em;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      display: inline-flex;
      align-items: center;
      margin-right: 0.8em;
      font-size: 0.8em;
      :nth-child(1) img {
        height: 1.05em;
      }
      :nth-child(2) img {
        height: 0.85em;
      }
    }
    img {
      height: 1em;
      margin-right: 0.3em;
    }
  `}
`;

const CaseCounts = styled.div`
  ${({ theme }) => css`
    color: ${theme.navy};
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
    }
    li {
      display: inline-flex;
      align-items: center;
      margin-right: 0.8em;
      font-size: 0.8em;
      :nth-child(1) img {
        height: 1.05em;
      }
      :nth-child(2) img {
        height: 0.85em;
      }
    }
    img {
      height: 1em;
      margin-right: 0.3em;
    }
  `}
`;
