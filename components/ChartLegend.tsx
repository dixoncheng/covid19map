import styled, { css } from "styled-components";

interface IProps {
  typeColor?: string;
}

const StyledChartLegend = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: center;
`;

const LegendItem = styled.div<IProps>`
  ${({ theme, typeColor }) => css`
    font-size: 1.2em;
    margin: 0 0.6em;
    :before {
      content: "";
      width: 0.8em;
      height: 0.8em;
      display: inline-block;
      border-radius: 50%;
      margin-right: 0.3em;
    }
    span {
      color: ${theme.navy};
    }
    :before {
      background-color: ${typeColor};
    }
  `}
`;

const ChartLegend = ({ items }: { items: any[] }) => (
  <StyledChartLegend>
    {items.map((item: any, i: number) => (
      <LegendItem key={i} typeColor={item.color}>
        <span>{item.title}</span>
      </LegendItem>
    ))}
  </StyledChartLegend>
);

export default ChartLegend;
