import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styled, { css, useTheme } from "styled-components";

const StyledTransmissionChart = styled.div`
  ${({ theme }) => css`
    position: relative;
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
    .row {
      display: flex;
      align-items: center;
    }
    .chart-wrap {
      width: 28em;
      height: 26em;
      margin-right: 1.5em;
    }
  `}
`;

const LegendItem = styled.div<{ typeColor: string }>`
  ${({ theme, typeColor }) => css`
    font-size: 1.5em;
    margin: 0.2em 0;
    position: relative;
    padding-left: 1.15em;
    :before {
      position: absolute;
      left: 0em;
      top: 0.25em;
      content: "";
      width: 0.8em;
      height: 0.8em;
      border-radius: 50%;
      margin-right: 0.5em;
    }
    span {
      color: ${theme.teal};
      font-weight: bold;
    }
    :before {
      background-color: ${typeColor};
    }
  `}
`;

const TransmissionChart = ({ data = [] }) => {
  const theme = useTheme();
  const chartColors = [
    theme.teal,
    theme.green,
    theme.navy,
    theme.yellow,
    "#956828",
  ];

  return (
    <StyledTransmissionChart>
      <div className="head">Transmission type</div>
      <div className="row">
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie dataKey="percent" data={data} outerRadius="100%">
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          {data.map((item: any, i: number) => (
            <LegendItem key={i} typeColor={chartColors[i]}>
              {item.type}: <span>{item.percent}%</span>
            </LegendItem>
          ))}
        </div>
      </div>
    </StyledTransmissionChart>
  );
};

export default TransmissionChart;
