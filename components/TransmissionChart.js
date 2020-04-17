import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styled, { css, withTheme } from "styled-components";

const TransmissionChart = ({ data = [], theme }) => {
  const chartColors = [theme.teal, theme.green, theme.navy, theme.yellow];

  return (
    <StyledTransmissionChart>
      <div className="head">Transmission type</div>
      <img src="/infographic/commtrans.svg" />
      <div className="row">
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie dataKey="percent" data={data} outerRadius="100%">
                {data.map((entry, index) => (
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
          {data.map((item, i) => (
            <LegendItem key={i} typeColor={chartColors[i]}>
              {item.type}: <span>{item.percent}%</span>
            </LegendItem>
          ))}
        </div>
      </div>
    </StyledTransmissionChart>
  );
};

export default withTheme(TransmissionChart);

const StyledTransmissionChart = styled.div`
  ${({ theme }) => css`
    position: relative;

    .head {
      color: ${theme.dark};
      font-family: ${theme.fontFancy};
      font-size: 2.1em;
      text-transform: uppercase;
      margin-top: 2.6em;
      margin-bottom: 0.8em;
      line-height: 1.1;
    }
    .row {
      border-radius: 0.5em;
      background: white;
      padding: 1.2em;

      display: flex;
      align-items: center;
    }
    img {
      position: absolute;
      top: -4.3em;
      right: 2em;
      width: 11em;
    }
    .chart-wrap {
      width: 14em;
      height: 14em;
      margin-right: 1.5em;
    }
  `}
`;

const LegendItem = styled.div`
  ${({ theme, typeColor }) => css`
    font-size: 1.5em;
    margin: 0.2em 0;
    :before {
      content: "";
      width: 0.8em;
      height: 0.8em;
      display: inline-block;
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
