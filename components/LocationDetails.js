import styled, { css, withTheme } from "styled-components";
import RegionAgeGenderChart from "../components/RegionAgeGenderChart";
import RegionOverseasChart from "../components/RegionOverseasChart";
import Recovered from "../components/Recovered";
import RegionDailyCasesChart from "../components/RegionDailyCasesChart";
import Genders from "../components/Genders";
import * as gtag from "../lib/gtag";

const LocationDetails = ({ location, data }) => {
  const [
    regionAgesGenders,
    regionOverseas,
    regionGenders,
    history,
    clusters,
  ] = data;
  const { name, url } = location;
  const { active, recovered, deaths, total } = history[history.length - 1];

  return (
    <StyledLocationDetails>
      <div className="details">
        <h2>{name.replace("ā", "a")}</h2>
        <Stats>
          <div className="active">
            <div>
              <strong>{active}</strong>
              {location.newCases > 0 && (
                <div className="new">+{location.newCases}</div>
              )}
            </div>
            <span className="label">Active Cases</span>
          </div>
          <div className="numbers">
            <div>
              <strong>{total}</strong> <span className="label">Total</span>
            </div>
            <div>
              <strong>{recovered}</strong>{" "}
              <span className="label">Recovered</span>
            </div>
            <div>
              <strong>{deaths}</strong> <span className="label">Deaths</span>
            </div>
          </div>
        </Stats>
        <hr />
        <Row>
          {/* <Hospital>
            <div>
              <strong>2</strong> <span>in hospital</span>
            </div>
            <div>
              <img src="/hospitalbed.svg" />
            </div>
          </Hospital> */}
          <Genders genders={regionGenders} regional />
          <Recovered recovered={recovered} combined={total} regional />
        </Row>

        {clusters ? (
          <Clusters>
            <h3>Significant clusters</h3>
            <ul>
              {Object.keys(clusters).map((clustLocName, i) => {
                const { items } = clusters[clustLocName];
                return items.map(({ name, totalCases }, i) => (
                  <li key={i}>
                    <strong>{totalCases}</strong>{" "}
                    <span>
                      {name}, {clustLocName}
                    </span>
                  </li>
                ));
              })}
            </ul>
          </Clusters>
        ) : (
          <hr />
        )}

        <RegionDailyCasesChart history={history} />

        <hr />
        {regionAgesGenders && <RegionAgeGenderChart data={regionAgesGenders} />}

        {regionAgesGenders && regionOverseas && <hr />}

        {regionOverseas && <RegionOverseasChart data={regionOverseas} />}

        {url && (
          <>
            <hr />
            <div className="dhb-link">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => gtag.event("DHB link", "", name)}
              >
                View DHB updates
              </a>
            </div>
          </>
        )}
      </div>

      {/* <Bar>
              {location.location}
              <span>
                {location.totalCases}{" "}
                {location.totalCases === 1 ? "Case" : "Cases"}
              </span>
            </Bar> */}

      {/* {location?.cases?.map(
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
                  </div>
                </Case>
              )
            )}

            {!location.cases && (
              <p style={{ textAlign: "center" }}>
                <small>Details yet to be released</small>
              </p>
            )}

            {location.cases.length < location.totalCases && (
              <p style={{ textAlign: "center" }}>
                <small>
                  Note: Some case details have been removed by <br />
                  the Ministry of Health.
                </small>
              </p>
            )} */}
    </StyledLocationDetails>
  );
};

export default withTheme(LocationDetails);

const StyledLocationDetails = styled.div`
  ${({ theme, ...props }) => css`
    border-radius: 0.35em;
    background: white;
    padding: 2.5em 1em 1em;
    position: relative;
    :before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 11em;
      height: 3em;
      background: url(${require(`../public/clip.svg`)}) center center no-repeat;
      background-size: contain;
      transform: translate(-50%, -50%);
    }
    h2 {
      font-family: ${theme.fontFancy};
      text-transform: uppercase;
      font-size: 1.3em;
      line-height: 1;
      margin: 0.2em 0 0.7em 0;
    }
    .dhb-link {
      font-size: 0.8em;
      text-align: center;
    }
  `}
`;

const Stats = styled.div`
  ${({ theme, ...props }) => css`
    font-size: 0.9em;
    display: grid;
    grid-template-columns: auto 13em;
    grid-gap: 1em;

    .active {
      line-height: 1;
      > div {
        display: flex;
        align-items: center;
      }
      strong {
        font-size: 3em;
        /* font-weight: bold; */
        font-family: ${theme.fontFancy};
        color: ${theme.teal};
        margin-right: 0.25em;
      }
      .new {
        background: ${theme.green};
        color: white;
        display: inline-block;
        font-size: 1.2em;
        font-weight: bold;
        padding: 0.15em 0.25em;
        border-radius: 0.15em;
      }
      .label {
        font-size: 1.2em;
      }
    }
    .numbers {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      /* grid-gap: 2em; */
      background: #eef3ef;
      border-radius: 0.15em;
      text-align: center;
      line-height: 1;
      strong {
        display: block;
        color: ${theme.teal};
        font-size: 1.5em;
      }
      .label {
        font-size: 0.9em;
      }
    }
  `}
`;

// const Case = styled.div`
//   ${({ theme, status }) => css`
//     font-size: 14px;
//     margin-top: 4px;
//     h3 {
//       margin: 0;
//       font-size: 14px;
//       color: white;
//       background: ${theme.teal};
//       padding: 2px 15px;
//       ${status === "Probable" &&
//       css`
//         background: ${theme.green};
//       `}
//     }
//     .age {
//       color: ${theme.teal};
//       ${status === "Probable" &&
//       css`
//         color: ${theme.green};
//       `}
//     }
//     .details {
//       background: white;
//       padding: 10px 15px;
//     }
//   `}
// `;

// const Bar = styled.div`
//   ${({ theme }) => css`
//     display: flex;
//     justify-content: space-between;
//     font-size: 14px;
//     background: ${theme.green};
//     color: white;
//     padding: 7px 10px;
//     margin: 0 !important;
//     span {
//       text-align: right;
//     }
//   `}
// `;

const Hospital = styled.div`
  ${({ theme }) => css`
    /* display: flex;
    align-items: center; */
    line-height: 1;

    img {
      width: 4em;
      margin-right: 0.8em;
    }
    strong {
      font-size: 1.5em;
      color: ${theme.green};
      font-family: ${theme.fontFancy};
      display: block;
    }
    span {
      font-size: 0.9em;
    }
  `}
`;

const Row = styled.div`
  ${({ theme }) => css`
    display: grid;
    /* grid-template-columns: auto 1fr 1fr; */
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    align-items: center;
    > div {
      position: relative;
    }
    > div + div:after {
      content: "";
      position: absolute;
      left: -0.9em;
      top: 0;
      height: 100%;
      width: 2px;
      background-color: ${theme.light};
    }
  `}
`;

const Clusters = styled.div`
  ${({ theme }) => css`
    background-color: #ddf3f2;
    padding: 0.9em;
    margin-top: 1em;
    margin-bottom: 1.5em;
    border-radius: 0.2em;
    h3 {
      font-family: ${theme.fontFancy};
      margin: 0 0 0.5em;
      text-transform: uppercase;
      color: ${theme.teal};
      font-size: 1em;
      line-height: 1;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      margin: 1em 0 0 0;
      position: relative;
      padding-left: 2.5em;
      line-height: 1.15;
      strong {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.8em;
        height: 1.8em;
        background-color: white;
        border-radius: 50%;
        color: ${theme.green};
        margin-right: 0.6em;
      }
      span {
        font-size: 0.9em;
      }
    }
  `}
`;
