import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import styled, { css, useTheme } from "styled-components";

const StyledRegionDailyCasesChart = styled.div`
  ${({ theme }) => css`
    font-size: 0.5em;
    h3 {
      color: ${theme.dark};
      font-size: 2em;
      margin: 0 0 0.5em 0;
      line-height: 1.1;
      text-align: center;
    }
    .chart-wrap {
      height: 20em;
    }
  `}
`;

const RegionDailyCasesChart = ({ history }: { history: any }) => {
  const theme = useTheme();
  return (
    <StyledRegionDailyCasesChart>
      <h3>Daily Cases</h3>
      <div className="chart-wrap">
        <ResponsiveContainer>
          <LineChart
            data={history}
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
                history.findIndex((x: any) => x.date === tick)
              }
            />
            <YAxis />
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
      </div>
    </StyledRegionDailyCasesChart>
  );
};

export default RegionDailyCasesChart;
