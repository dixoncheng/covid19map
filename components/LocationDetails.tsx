import styled, { css, useTheme } from "styled-components";
import RegionAgeGenderChart from "components/RegionAgeGenderChart";
import RegionOverseasChart from "components/RegionOverseasChart";
import Recovered from "components/Recovered";
import RegionDailyCasesChart from "components/RegionDailyCasesChart";
import Genders from "components/Genders";
import * as gtag from "lib/gtag";

const StyledLocationDetails = styled.div`
  ${({ theme }) => css`
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
  ${({ theme }) => css`
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

const Hospital = styled.div`
  ${({ theme }) => css`
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
    grid-template-columns: auto 1fr 1fr;
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
      em {
        font-style: normal;
        color: white;
        background: ${theme.navy};
        padding: 0.1em 0.3em;
        margin-left: 0.2em;
        border-radius: 0.2em;
        font-size: 0.7em;
        position: relative;
        top: -0.1em;
      }
    }
  `}
`;

const LocationDetails = ({ location, data }: { location: any; data: any }) => {
  const [
    regionAgesGenders,
    regionOverseas,
    regionGenders,
    history,
    clusters,
  ] = data;
  const { name, url, inHospital, active, recovered, deaths, totalCases: total } = location;
  // const { active, recovered, deaths, total } = history[history.length - 1];

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
        {/* <hr /> */}
        {/* <Row>
          <Hospital>
            <div>
              <strong>{inHospital}</strong> <span>in hospital</span>
            </div>
            <div>
              <img src="/hospitalbed.svg" />
            </div>
          </Hospital>
          {regionGenders && <Genders genders={regionGenders} regional />}
          <Recovered recovered={recovered} combined={total} regional />
        </Row> */}

        {clusters ? (
          <Clusters>
            <h3>Significant clusters</h3>
            <ul>
              {Object.keys(clusters).map((clustLocName, i) => {
                const { items } = clusters[clustLocName];
                return items.map(
                  (
                    {
                      name,
                      totalCases,
                      ongoing,
                    }: { name: string; totalCases: number; ongoing: string },
                    i: number
                  ) => (
                    <li key={i}>
                      <strong>{totalCases}</strong>{" "}
                      <span>
                        {name}, {clustLocName}{" "}
                        {ongoing === "Closed" && <em>CLOSED</em>}
                      </span>
                    </li>
                  )
                );
              })}
            </ul>
          </Clusters>
        ) : (
          <hr />
        )}

        <RegionDailyCasesChart history={history} />

        {regionAgesGenders && (
          <>
            <hr />
            <RegionAgeGenderChart data={regionAgesGenders} />
          </>
        )}

        {regionOverseas && (
          <>
            <hr />
            <RegionOverseasChart data={regionOverseas} />
          </>
        )}

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
    </StyledLocationDetails>
  );
};

export default LocationDetails;
