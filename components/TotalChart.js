import styled, { css } from "styled-components";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const TotalChart = ({ summary }) => {
  return (
    <Chart>
      <div className="head">Total cases</div>
      <div className="chart-wrap">
        <ResponsiveContainer>
          <LineChart
            data={summary}
            margin={{ left: -30, right: 10, bottom: 20 }}
          >
            <XAxis
              dataKey="date"
              label={{
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
              dataKey="combinedTotal"
              stroke="#51b6b0"
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Chart>
  );
};

export default TotalChart;

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
