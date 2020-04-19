import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styled, { css, withTheme } from "styled-components";

const RegionOverseasChart = ({ data, theme }) => {
  const chartColors = [theme.navy, theme.yellow, "#a6e5e3"];
  return (
    <StyledRegionOverseasChart>
      <h3>Overseas Travel</h3>
      <div className="row">
        <div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart isAnimationActive={false}>
                <Pie dataKey="count" data={data} outerRadius="100%">
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
        </div>
        <div>
          {data.map((item, i) => (
            <LegendItem key={i} typeColor={chartColors[i]}>
              {item.overseas}: <span>{item.count}</span>
            </LegendItem>
          ))}
        </div>
      </div>
    </StyledRegionOverseasChart>
  );
};

export default withTheme(RegionOverseasChart);

const StyledRegionOverseasChart = styled.div`
  ${({ theme }) => css`
    font-size: 0.45em;
    position: relative;
    border-radius: 0.5em;
    background: white;
    padding: 2em;

    .row {
      display: flex;
      justify-content: center;
      > div {
        flex: 1;
      }
    }
    h3 {
      color: ${theme.dark};
      font-size: 2em;
      margin: 0 0 0.5em 0;
      line-height: 1.1;
      text-align: center;
    }
    .row {
      padding: 0;

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
      width: 16em;
      height: 16em;
      margin-left: auto;
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
