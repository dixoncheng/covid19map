import {
  BarChart,
  Bar,
  // Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import styled, { css, withTheme } from "styled-components";

const RegionAgeGenderChart = ({ data, theme }) => {
  return (
    <StyledRegionAgeGenderChart>
      <div className="head">Age Groups by district</div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
            <YAxis type="category" dataKey="age" interval={0} width={90} />
            <Bar
              dataKey="male"
              fill={theme.teal}
              // label={{ position: "insideRight", fill: "white" }}
              stackId="a"
            />
            <Bar
              dataKey="female"
              fill={theme.green}
              // label={{ position: "insideRight", fill: "white" }}
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="legend">
        <div className="legend-item male">Male</div>
        <div className="legend-item female">Female</div>
      </div>
    </StyledRegionAgeGenderChart>
  );
};

export default withTheme(RegionAgeGenderChart);

const StyledRegionAgeGenderChart = styled.div`
  ${({ theme, ...props }) => css`
    font-size: 0.45em;
    width: 100%;
    padding: 1em 0;
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
      ${
        props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            display: block;
          }
        `
      }
      strong {
        display: block;
        color: ${theme.green};
      }
    }

    .legend {
      display: flex;
      justify-content: center;
      margin: 5px 0 0 0px;
      font-size: 12px;
      color: black;
    }
    .legend-item {
      margin: 0 6px;
      /* color: ${theme.navy}; */
      :before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 4px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
    .male:before {
      background: ${theme.teal};
    }
    .female:before {
      background: ${theme.green};
    }
  `}
`;
