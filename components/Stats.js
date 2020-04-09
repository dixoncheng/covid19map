import styled, { css } from "styled-components";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
// import PieChart from "./PieChart";

const Stats = ({ data, children }) => {
  const { summary } = data;
  const {
    confirmedTotal,
    probableTotal,
    recoveredTotal,
    deathsTotal,
    combinedTotal,
    combined,
    hospitalTotal,
  } = summary[summary.length - 1];

  const {
    countMale,
    countFemale,
    ages: ageData,
    totalCasesPublished,
  } = data.caseDetails;
  const { casesPer1m, transmissions } = data;
  // console.log(transmissions);

  const recoveryRate = Math.round((recoveredTotal / combinedTotal) * 100);
  const percentWomen = Math.round((countFemale / totalCasesPublished) * 100);
  const percentMen = Math.round((countMale / totalCasesPublished) * 100);

  return (
    <div className="container">
      <Infographic>
        <Row></Row>
        <Row>
          {/* <Globe>
            <div className="globe">
              <img src="/infographic/world.svg" />
              <div className="text">
                <strong>{countriesAffected}</strong>
                Countries
                <br />
                Affected
              </div>
            </div>
            <img className="mag" src="/infographic/magnifyingglass.svg" />
          </Globe> */}

          {casesPer1m.length > 0 && (
            <Ranking>
              <div className="head">Total cases per 1m population</div>
              {casesPer1m.map((item, i) => (
                <div key={i} className="country">
                  <div className="count">{item.numCases}</div>
                  <div className="title">{item.title}</div>
                </div>
              ))}
            </Ranking>
          )}
          {/* <Clipboard>
            <div>
              <img src="/infographic/clipboard.svg" />
              <div className="head">
                Top 5 NZ
                <br /> affected
                <br /> areas
              </div>
              {top5inNZ.map((item, i) => (
                <div key={i} className="location">
                  <div>
                    <div className="count">{item.totalCases}</div>
                  </div>{" "}
                  {item.location}
                </div>
              ))}
            </div>
          </Clipboard> */}
        </Row>
        {/* <Footer>
          <div className="head">Sources:</div>
          <a
            href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ministry of Health
          </a>
          <br />
          <a
            href="https://github.com/CSSEGISandData/COVID-19"
            target="_blank"
            rel="noopener noreferrer"
          >
            Johns Hopkins University CSSE
          </a>

          <button type="button" className="view-map" onClick={onViewChange}>
            <img src="/infographic/backtomap.svg" /> View <br />
            Live Map
          </button>
          <img src="/infographic/sth.svg" />
        </Footer> */}
      </Infographic>
    </div>
  );
};

export default Stats;

const Infographic = styled.div`
  ${({ theme, ...props }) => css`
    font-size: 2vw;

    @media (min-width: ${theme.sm}) {
      font-size: 0.45em;
    }
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        font-size: 1vw;
      }
    `}

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      /* grid-template-rows: 1fr 1fr; */
      grid-gap: 0em 2em;
      margin: 2em 0;
      ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          margin: 0;
          grid-gap: 0;
        }
      `}
    }

    .date-mobile {
      margin-left: 2.5em;
      ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          display: none;
        }
      `}
    }
  `}
`;

const Row = styled.div`
  ${({ theme, ...props }) => css`
    /* padding: 0 2em; */
    margin: 2em 0 0;
    justify-content: space-between;
    > div {
      margin-top: 0.7em;
      margin-bottom: 0.7em;
    }
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        display: flex;
        padding: 0 2.5em;
        > div {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
    `}
    .flex-mobile {
      display: flex;
      justify-content: space-between;
      align-items: center;

      ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
        }
      `}
    }
  `}
`;

const Alert = styled.div`
  ${({ theme, ...props }) => css`
    width: 21em;
    background: #fff1c1;
    position: absolute;
    top: 0;
    right: 5em;
    font-size: 0.6em;
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        font-size: 1em;
        right: 2.5em;
      }
    `}

    .head {
      height: 3em;
      background: url(/infographic/alertlevel.svg) no-repeat;
      background-size: cover;
    }
    .body {
      display: grid;
      grid-template-columns: 2fr auto;
      grid-gap: 0 0.5em;
      align-items: center;
      line-height: 1.1;
      color: ${theme.yellow};
      font-size: 3em;
      font-family: ${theme.fontFancy};
      font-weight: normal;
      text-transform: uppercase;
      padding: 0.5em;
      div {
        font-family: ${theme.font};
        font-weight: bold;
        font-size: 3em;
      }
    }
  `}
`;

const Deaths = styled.div``;

const Transmissions = styled.div`
  ${({ theme, ...props }) => css`
    padding: 2em 1.3em 1.3em;
    background: white;
    border-radius: 0.4em;
    font-family: ${theme.fontFancy};
    font-size: 1.9em;
    text-transform: uppercase;
    color: ${theme.dark};
    line-height: 1.1;
    position: relative;
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        margin-top: 2em;
      }
    `}
    strong {
      display: block;
      font-size: 3em;
      color: ${theme.yellow};
      margin-bottom: 0.1em;
    }
    img {
      width: 6em;
      position: absolute;
      top: 0.5em;
      left: 3.9em;
    }
  `}
`;

const Soap = styled.div`
  ${({ theme, ...props }) => css`
    margin-left: auto;
    text-align: right;
    /* position: relative; */
    /* left: 2em; */
    /* 
    @media (min-width: ${theme.sm}) {
    } 
    */
    img {
      margin-top: 2em;
      width: 23em;
    }
  `}
`;

const Chart = styled.div`
  ${({ theme, ...props }) => css`
    background: white;
    border-radius: 0.5em;
    padding: 2.5em 2em;
    .head {
      text-align: center;
      color: ${theme.dark};
      font-family: ${theme.fontFancy};
      font-size: 2.1em;
      text-transform: uppercase;
      margin-bottom: 1.2em;
      line-height: 1.1;
    }
    .chart-wrap {
      height: 25em;
      ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          width: 40em;
        }
      `}
    }
  `}
`;

const Globe = styled.div`
  ${({ theme, ...props }) => css`
    position: relative;

    font-size: 1.3em;
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        font-size: 1em;
      }
    `}

    .globe {
      position: relative;
      left: 1em;
      width: 25em;
      margin: 0 auto;
      display: block;
    }
    .mag {
      width: 25em;
      position: absolute;
      bottom: 0;
      left: -2.5em;
      display: none;
      ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          display: block;
        }
      `}
    }
    .text {
      position: absolute;
      top: 2em;
      left: 1.6em;
      font-size: 2.4em;
      font-family: ${theme.fontFancy};
      text-align: center;
      line-height: 1.1;
      color: white;
      text-transform: uppercase;
    }
    strong {
      display: block;
      font-size: 2.8em;
    }
  `}
`;

const Ranking = styled.div`
  ${({ theme, ...props }) => css`
    padding-bottom: 2em;
    .head {
      color: ${theme.dark};
      font-size: 2em;
      text-transform: uppercase;
      font-family: ${theme.fontFancy};
      margin-bottom: 0.5em;
    }
    .country {
      color: ${theme.teal};
      background: white;
      margin-bottom: 0.75em;
      border-radius: 0.5em;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    .count {
      background: ${theme.green};
      color: white;
      text-align: center;
      font-family: ${theme.fontFancy};
      font-size: 2.6em;
      padding: 0.2em;
      width: 4em;
    }
    .title {
      padding: 0 1em;
      font-size: 2.8em;
      font-weight: bold;
    }
  `}
`;

const Clipboard = styled.div`
  ${({ theme, ...props }) => css`
    margin: 3em auto 3em !important;
    line-height: 1.1;
    ${
      props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          width: 30em;
          margin: 0 !important;
          width: 20em;
        }
      `
    }
    > div {
      background: #a6e5e3;
      border-radius: 0.5em;
      position: relative;
      margin-top: 3em;
      padding: 2.5em 2em 2em;
      /* 
      @media (min-width: ${theme.sm}) {
        margin-top: 3em;
      } */
    }
    img {
      position: absolute;
      top: -2.5em;
      left: 50%;
      transform: translateX(-50%);
      width: 8.5em;
    }
    .head {
      color: ${theme.dark};
      font-size: 2em;
      text-transform: uppercase;
      font-family: ${theme.fontFancy};
      line-height: 1.1;
      margin-bottom: 0.6em;
      br {
        display: none;
        ${
          props.wide &&
          css`
            @media (min-width: ${theme.sm}) {
              display: block;
            }
          `
        }
      }
    }
    .location {
      font-size: 1.7em;
      display: flex;
      align-items: center;
      margin-bottom: 0.3em;
    }
    .count {
      background: white;
      border-radius: 50%;
      width: 2em;
      height: 2em;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      margin-right: 0.5em;
      color: ${theme.green};
    }
  `}
`;

const Footer = styled.div`
  ${({ theme, ...props }) => css`
    position: relative;
    background: ${theme.dark};
    padding: 2em 31em 3em 2.5em;
    line-height: 1.5;
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        padding-right: 2.5em;
      }
    `}
    .head {
      font-size: 1.5em;
      color: ${theme.green};
    }
    a {
      font-size: 1.5em;
      color: white;
    }
    img {
      position: absolute;
      right: 2.5em;
      bottom: 0;
      width: 16em;
    }
    .view-map {
      border: none;
      position: absolute;
      right: 14em;
      bottom: 0;
      display: block;
      color: white;
      background: ${theme.yellow};
      padding: 0.7em 1.2em;
      font-size: 1.5em;
      border-radius: 0.25em 0.25em 0 0;
      line-height: 1.2;
      text-align: center;
      :hover {
        opacity: 1;
        background: #ffd951;
      }
      img {
        position: static;
        display: block;
        margin: 0 auto 0.2em;
        width: 2.1em;
      }
    }
  `}
`;

const Logo = styled.div`
  ${({ theme, ...props }) => css`
    display: flex;
    align-items: center;
    padding: 1em 2.5em 0.5em;

    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        display: none;
      }
    `}

    img {
      width: 6em;
      margin-right: 1em;
    }
    h1 {
      white-space: nowrap;
      font-size: 3.5em;
      color: ${theme.teal};
      margin: 0;
    }
  `}
`;
