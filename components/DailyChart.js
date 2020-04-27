import styled, { css, withTheme } from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import ChartLegend from "./ChartLegend";

const TotalChart = ({ summary, theme }) => {
  return (
    <Chart>
      <div className="head">Daily cases</div>
      <div className="chart-wrap">
        <ResponsiveContainer>
          <LineChart
            data={summary}
            margin={{ left: -30, right: 10, bottom: 20 }}
          >
            <XAxis
              dataKey="date"
              label={{
                fill: theme.navy,
                fontSize: 12,
                value: "Days since first case detected",
                position: "bottom",
              }}
              tickFormatter={(tick) =>
                summary.findIndex((x) => x.date === tick)
              }
            />
            <YAxis />
            <Line
              type="monotone"
              dataKey="recovered"
              stroke="#aacd6e"
              strokeWidth={4}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="combined"
              stroke="#ffc906"
              strokeWidth={4}
              dot={false}
            />

            <ReferenceLine x="2020-03-25T00:00:00.000Z" stroke="#025064" />
          </LineChart>
        </ResponsiveContainer>

        <ChartLegend
          items={[
            { title: "New", color: theme.yellow },
            { title: "Recovered", color: theme.green },
            { title: "Lv4 lockdown", color: theme.navy },
          ]}
        />
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
  `}
`;
