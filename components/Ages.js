import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import styled, { css } from "styled-components";

const COLORS = [
  "#51b6b0",
  "#aacd6e",
  "#025064",
  "#317c3f",
  "#956828",
  "#d4b074",
  "#ffc906",
  "#e98e23",
  "#af5434",
  "#833f24",
];

const Ages = ({ ageData }) => {
  return (
    <StyledAges>
      <div className="head">Age Groups</div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ageData}
            layout="vertical"
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 10,
            }}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="title" interval={0} width={90} />
            <Bar
              dataKey="numCases"
              fill="#8884d8"
              label={{ position: "insideRight", fill: "white" }}
            >
              {ageData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </StyledAges>
  );
};

export default Ages;

const StyledAges = styled.div`
  ${({ theme, ...props }) => css`
    width: 100%;
    .head {
      color: ${theme.dark};
      font-family: ${theme.fontFancy};
      font-size: 2.1em;
      text-transform: uppercase;
      margin-bottom: 0.5em;
      line-height: 1.1;
    }
    .chart-wrap {
      width: 45em;
      height: 34em;
    }
    .recharts-cartesian-axis-tick-value tspan {
      font-size: 1.4em;
    }
    .recharts-label {
      font-size: 1.4em;
    }

    .recharts-surface {
      transform: translateX(-30px);
      @media (min-width: 430px) {
        transform: translateX(-20px);
      }
      @media (min-width: 520px) {
        transform: translateX(0px);
      }
      @media (min-width: ${theme.sm}) {
        transform: translateX(-30px);
      }
    }

    .foot {
      display: none;
      background-color: white;
      padding: 0.6em 0.8em;
      font-size: 1.6em;
      color: ${theme.dark};
      ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          display: block;
        }
      `}
      strong {
        display: block;
        color: ${theme.green};
      }
    }
  `}
`;
