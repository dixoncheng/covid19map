import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import styled, { css, useTheme } from "styled-components";

const StyledRegionAgeGenderChart = styled.div`
  ${({ theme, ...props }) => css`
    font-size: 0.5em;

    h3 {
      color: ${theme.dark};
      font-size: 2em;
      margin: 0 0 0.5em 0;
      line-height: 1.1;
      text-align: center;
    }

    .chart-wrap {
      /* width: 45em; */
      height: 24em;
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

    .legend {
      display: flex;
      justify-content: center;
      margin: 5px 0 0 0px;
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
    .male:before {
      background: ${theme.teal};
    }
    .female:before {
      background: ${theme.green};
    }
  `}
`;

const RegionAgeGenderChart = ({ data }) => {
  const theme = useTheme();
  return (
    <StyledRegionAgeGenderChart>
      <h3>Age Groups by DHB</h3>
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
            <Bar dataKey="male" fill={theme.teal} stackId="a" />
            <Bar dataKey="female" fill={theme.green} stackId="a" />
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

export default RegionAgeGenderChart;
