import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import styled, { css, useTheme } from "styled-components";
import ChartLegend from "./ChartLegend";

const StyledAges = styled.div`
  ${({ theme, ...props }) => css`
    background: white;
    border-radius: 0.5em;
    padding: 2.5em 2em;
    box-sizing: border-box;
    min-height: 36em;

    .head {
      color: ${theme.dark};
      font-family: ${theme.fontFancy};
      font-size: 2.1em;
      text-transform: uppercase;
      margin-bottom: 0.5em;
      line-height: 1.1;
      text-align: center;
    }
    .chart-wrap {
      width: 42em;
      height: 25em;
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

const Ages = ({ ages }) => {
  const theme = useTheme();
  return (
    <StyledAges>
      <div className="head">Cases by Age</div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ages}
            layout="vertical"
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 10,
            }}
            isAnimationActive={false}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="group" interval={0} width={90} />

            <Bar dataKey="active" fill={theme.teal} stackId="a" />
            <Bar dataKey="recovered" fill={theme.green} stackId="a" />
            <Bar dataKey="deaths" fill={theme.navy} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend
        items={[
          { title: "Active", color: theme.teal },
          { title: "Recovered", color: theme.green },
          { title: "Deaths", color: theme.navy },
        ]}
      />
    </StyledAges>
  );
};

export default Ages;
