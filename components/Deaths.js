import styled, { css } from "styled-components";

const Deaths = ({ deathsTotal }) => {
  return (
    <StyledDeaths>
      <strong>{deathsTotal}</strong>
      <span>{deathsTotal === 1 ? "Death" : "Deaths"}</span>
    </StyledDeaths>
  );
};

export default Deaths;

const StyledDeaths = styled.div`
  ${({ theme, ...props }) => css`
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
      ${props.count > 99 && css``}
    }
    span {
      color: ${theme.green};
      font-size: 2em;
    }
  `}
`;
