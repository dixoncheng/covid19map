import { PieChart, Pie, Cell, Tooltip } from "recharts";
import styled, { css, createGlobalStyle } from "styled-components";

const COLORS = ["#51b6b0", "#aacd6e", "#025064", "#ffc906"];

const TransmissionChart = ({ data = [] }) => {
  // console.log(data);
  return (
    <StyledTransmissionChart>
      <div className="head">Transmission type</div>
      <img src="/infographic/commtrans.svg" />
      <div className="row">
        <div>
          <PieChart width={120} height={110}>
            <Pie
              dataKey="percent"
              // isAnimationActive={false}
              data={data}
              cx={50}
              cy={50}
              outerRadius={50}
              // label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {/* <Tooltip /> */}
          </PieChart>
        </div>
        <div>
          {data.map((item, i) => (
            <LegendItem key={i} type={i}>
              {item.type}: <span>{item.percent}%</span>
            </LegendItem>
          ))}
        </div>
      </div>
    </StyledTransmissionChart>
  );
};

export default TransmissionChart;

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
  `}
`;

const LegendItem = styled.div`
  ${({ theme, type }) => css`
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
      background-color: ${COLORS[type]};
    }
  `}
`;
