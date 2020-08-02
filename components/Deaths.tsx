import styled, { css } from "styled-components";

const StyledDeaths = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${theme.dark};
    height: 13em;
    width: 13em;
    border-radius: 50%;
    margin: 2em 0 0 8em;
    line-height: 1;
    strong {
      font-size: 6em;
      display: block;
      color: white;
    }
    span {
      color: ${theme.green};
      font-size: 2em;
    }
  `}
`;

const Deaths = ({ deathsTotal }: { deathsTotal: number }) => (
  <StyledDeaths>
    <strong>{deathsTotal}</strong>
    <span>{deathsTotal === 1 ? "Death" : "Deaths"}</span>
  </StyledDeaths>
);

export default Deaths;
