import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import styled, { css, useTheme } from "styled-components";

const StyledAges = styled.div`
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
      margin-bottom: 0.5em;
      line-height: 1.1;
    }
    .chart-wrap {
      width: 45em;
      height: 30em;
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
      strong {
        display: block;
        color: ${theme.green};
      }
    }
  `}
`;

const Ages = ({ data }: { data: any[] }) => {
  const theme = useTheme();
  const countries: any = {
    NZL: { name: "NZ", color: theme.teal },
    AUS: { name: "AU", color: theme.green },
    USA: { name: "USA", color: theme.navy },
    CHN: { name: "CHINA", color: "#317c3f" },
    ITA: { name: "ITALY", color: "#956828" },
    GBR: { name: "UK", color: "#d4b074" },
    KOR: { name: "S.KOREA", color: theme.yellow },
  };
  const dataWithNames = data.map((item: any) => {
    return {
      ...item,
      name: countries[item.country].name,
      country: countries[item.country],
    };
  });

  dataWithNames.sort((x, y) => (x.per1m > y.per1m ? -1 : 1));

  return (
    <StyledAges>
      <div className="head">Cases per 1 million</div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dataWithNames}
            layout="vertical"
            margin={{
              top: 10,
              right: 60,
              left: 0,
              bottom: 10,
            }}
            // @ts-ignore
            isAnimationActive={false}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" interval={0} width={90} />
            <Bar
              dataKey="per1m"
              fill="#8884d8"
              label={{ position: "right", fill: theme.dark }}
              minPointSize={2}
            >
              {dataWithNames.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.country.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </StyledAges>
  );
};

export default Ages;
