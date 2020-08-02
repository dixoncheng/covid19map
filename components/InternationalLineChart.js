import styled, { css, useTheme } from "styled-components";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import ChartLegend from "./ChartLegend";

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
      height: 30em;
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

const TotalChart = ({ data }) => {
  const theme = useTheme();
  const countries = {
    NZL: { name: "NZ", color: theme.teal },

    AUS: { name: "AU", color: theme.green },
    USA: { name: "USA", color: theme.navy },
    CHN: { name: "CHINA", color: "#317c3f" },
    ITA: { name: "ITALY", color: "#956828" },
    GBR: { name: "UK", color: "#d4b074" },
    KOR: { name: "S.KOREA", color: theme.yellow },
  };

  const countriesArray = Object.keys(countries).map((countryName, i) => {
    return { key: countryName, ...countries[countryName] };
  });

  const countriesSortedArray = [...countriesArray].sort((x, y) =>
    x.name === "NZ" ? 1 : -1
  );

  return (
    <Chart>
      <div className="head">Total cases</div>
      <div className="chart-wrap">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 10, left: -5, right: 10, bottom: 20 }}
          >
            <XAxis
              dataKey="day"
              label={{
                fontSize: 12,
                value: "Days since 50 confirmed cases detected",
                position: "bottom",
              }}
            />
            <YAxis scale="log" domain={["auto", "auto"]} />

            {countriesSortedArray.map((item, i) => (
              <Line
                key={i}
                type="monotone"
                dataKey={item.key}
                stroke={item.color}
                strokeWidth={item.name === "NZ" ? 5 : 3}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        <ChartLegend
          items={[
            ...countriesArray.map(({ name: title, color }, i) => ({
              title,
              color,
            })),
          ]}
        />
      </div>
    </Chart>
  );
};

export default TotalChart;
