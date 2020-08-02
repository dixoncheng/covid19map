import styled, { css } from "styled-components";

const Total = styled.div`
  ${({ theme, ...props }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.94em;
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        padding-top: 0;
        margin-right: 16em;
        font-size: 1.45em;
      }
    `}
    h1 {
      white-space: nowrap;
      font-weight: normal;
      margin: 0;
      font-size: 3em;
      font-family: ${theme.fontFancy};
      color: ${theme.teal};
      text-transform: uppercase;
      line-height: 1.1;
    }
  `}
`;

const TotalNumber = styled.div`
  ${({ theme, num, ...props }) => css`
    display: flex;
    color: ${theme.green};
    font-size: 5.3em;
    ${num > 999 &&
    css`
      font-size: 4.5em;
    `}

    span {
      background: white;
      display: inline-block;
      border-radius: 0.1em;
      padding: 0.1em 0.12em;
      margin: 0.03em;
      font-weight: bold;
      line-height: 1;
    }
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        font-size: 6em;
      }
    `}
  `}
`;

const Totals = ({ total }) => (
  <Total>
    <h1>
      Active cases <br />
      in New Zealand
    </h1>
    <TotalNumber num={total}>
      {total
        .toString()
        .split("")
        .map((digit, i) => (
          <span key={i}>{digit}</span>
        ))}
    </TotalNumber>
  </Total>
);

export default Totals;
