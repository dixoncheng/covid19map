import styled, { css } from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const TotalChart = ({ summary }) => {
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

        <div className="legend">
          <div className="legend-item daily">New</div>
          <div className="legend-item recovered">Recovered</div>
          <div className="legend-item lockdown">Lv4 lockdown</div>
        </div>
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
      margin: 5px 0 0 10px;
      font-size: 12px;
      color: black;
    }
    .legend-item {
      margin: 0 6px;
      :before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 4px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
    .daily:before {
      background: ${theme.yellow};
    }
    .recovered:before {
      background: ${theme.green};
    }
    .lockdown:before {
      background: ${theme.navy};
    }
  `}
`;
