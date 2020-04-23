import styled, { css, withTheme } from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const lines = [
  // "NZL",
  "AUS",
  "USA",
  "CHN",
  // "ESP",
  "ITA",
  "GBR",
  // "SGP",
  "KOR",
  // "TWN",
];

const TotalChart = ({ data, theme }) => {
  const chartColors = [
    // theme.teal,
    theme.green,
    theme.navy,
    "#317c3f",
    "#956828",
    "#d4b074",
    theme.yellow,
    "#e98e23",
    "#af5434",
    "#833f24",
  ];

  return (
    <Chart>
      {/* <div className="head">Total cases</div> */}
      <div className="chart-wrap">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 10, left: -10, right: 10, bottom: 20 }}
          >
            <XAxis
              dataKey="day"
              label={{
                fontSize: 12,
                value: "Days since 50 confirmed cases detected",
                position: "bottom",
              }}
              // tickFormatter={(tick) => data.findIndex((x) => x.date === tick)}
            />
            <YAxis scale="log" domain={["auto", "auto"]} />

            {lines.map((item, i) => (
              <Line
                key={i}
                type="monotone"
                dataKey={item}
                stroke={chartColors[i % chartColors.length]}
                strokeWidth={item === "NZL" ? 4 : 3}
                dot={false}
              />
            ))}

            <Line
              type="monotone"
              dataKey="NZL"
              stroke={theme.teal}
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="legend">
          <LegendItem legendColor={theme.teal}>NZL</LegendItem>
          {lines.map((item, i) => (
            <LegendItem legendColor={chartColors[i % chartColors.length]}>
              {item}
            </LegendItem>
          ))}
        </div>
      </div>
    </Chart>
  );
};

export default withTheme(TotalChart);

const Chart = styled.div`
  ${({ theme, ...props }) => css`
    /* margin: 0 1em; */
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
      padding-bottom: 20px;
      ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          width: 40em;
        }
      `}
    }
    .legend {
      display: flex;
      justify-content: center;
      margin: 5px 0 0 0px;
      font-size: 12px;
      color: black;
    }
  `}
`;

const LegendItem = styled.div`
  ${({ theme, legendColor }) => css`
    margin: 0 6px;
    :before {
      content: "";
      display: inline-block;
      width: 20px;
      height: 4px;
      margin-right: 5px;
      vertical-align: middle;
      background-color: ${legendColor};
    }
  /* .total:before {
    background: ${theme.teal};
  }
  .recovered:before {
    background: ${theme.green};
  }
  .lockdown:before {
    background: ${theme.navy};
  } */
  `}
`;
