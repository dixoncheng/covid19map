import styled, { css } from "styled-components";

const StyledLegend = styled.div`
  ${({ theme }) => css`
    margin-bottom: 0.3em;
    font-size: 2.1em;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      display: inline-flex;
      align-items: center;
      margin-right: 0.8em;
      font-size: 0.8em;
      :nth-child(1) img {
        height: 1.05em;
      }
      :nth-child(2) img {
        height: 0.85em;
      }
    }
    img {
      height: 1em;
      margin-right: 0.3em;
    }
  `}
`;

const Legend = () => (
  <StyledLegend>
    <ul>
      <li>
        <img src={require(`../public/active.svg`)} /> Total Cases
      </li>
      <li>
        <img src={require(`../public/recovered.svg`)} />
        Recovered
      </li>
      <li>
        <img src={require(`../public/deaths.svg`)} />
        Deaths
      </li>
    </ul>
  </StyledLegend>
);

export default Legend;
