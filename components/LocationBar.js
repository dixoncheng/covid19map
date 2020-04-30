import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import styled, { css, withTheme } from "styled-components";
import * as gtag from "../lib/gtag";

const LocationBar = ({ location, history, onClick, theme }) => {
  if (!location || !history) {
    return <div />;
  }

  return (
    <StyledLocationBar>
      <div
        className="head"
        onClick={() => {
          if (onClick) {
            onClick(location.name);
            gtag.event("View location", "", location.name);
          }
        }}
      >
        <div className="stats">
          <div>
            <span className="name">{location.name}</span>
            <CaseCounts>
              <ul>
                <li>
                  <img src={require(`../public/active.svg`)} />{" "}
                  {location.totalCases}
                </li>
                <li>
                  <img src={require(`../public/recovered.svg`)} />{" "}
                  {history[history.length - 1].recovered}
                </li>
                <li>
                  <img src={require(`../public/deaths.svg`)} />{" "}
                  {history[history.length - 1].deaths}
                </li>
              </ul>
            </CaseCounts>
          </div>
          <div className="num-cases">
            <div className="total-cases">
              {history[history.length - 1].active}
            </div>
            {location.newCases > 0 && <small>+{location.newCases}</small>}
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
            <LineChart data={history}>
              <XAxis dataKey="date" hide />
              <Line
                type="monotone"
                dataKey="new"
                stroke={theme.teal}
                strokeWidth={1}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </InlineChart>
      </div>
    </StyledLocationBar>
  );
};

export default withTheme(LocationBar);

const StyledLocationBar = styled.div`
  ${({ theme, opened }) => css`
    font-size: 2.1em;
    background: white;
    padding: 0.2em 0.6em 0.2em;
    margin: 5px 0 !important;

    justify-content: space-between;
    /* align-items: center; */
    transition: 0.3s ease;
    ${!opened &&
    css`
      :hover {
        background: #bee1dd;
        cursor: pointer;
      }
    `}

    .head {
      display: flex;
      cursor: pointer;
    }

    .stats {
      padding: 6px 0;
      /* width: 50%; */
      flex: 1;
      display: flex;
      justify-content: space-between;
      /* align-items: center; */
    }
    .name {
      color: ${theme.teal};
      white-space: nowrap;
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
    .details {
      text-align: center;
      padding: 0 0.5em 1em;
    }
    .dhb-link {
      font-size: 0.7em;
    }
    hr:first-child {
      margin-top: 0;
    }
  `}
`;

const InlineChart = styled.div`
  width: 42%;
  height: 50px;
  /* margin-left: 5px;
  display: inline-block; */
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
