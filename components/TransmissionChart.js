import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styled, { css, withTheme } from "styled-components";

const TransmissionChart = ({ data = [], theme }) => {
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
      {/* <img src={require(`../public/infographic/commtrans.svg`)} /> */}
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
      /* border-radius: 0.5em;
      background: white;
      padding: 1.2em; */

      display: flex;
      align-items: center;
    }
    /* img {
      position: absolute;
      top: -4.3em;
      right: 2em;
      width: 11em;
    } */
    .chart-wrap {
      width: 28em;
      height: 26em;
      margin-right: 1.5em;
    }
  `}
`;

const LegendItem = styled.div`
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
      /* display: inline-block; */
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
