import styled, { css } from "styled-components";

const NewCases = ({ combined }) => (
  <StyledNewCases>
    <strong>+{combined}</strong> New cases
    <br />
    in the last
    <br />
    24 hours
    <img src={require(`../public/infographic/nznewcases.svg`)} />
  </StyledNewCases>
);

export default NewCases;

const StyledNewCases = styled.div`
  ${({ theme, ...props }) => css`
    font-family: ${theme.fontFancy};
    font-size: 2.4em;
    text-transform: uppercase;
    color: ${theme.dark};
    line-height: 1.1;
    position: relative;
    strong {
      display: block;
      font-size: 3em;
      color: ${theme.green};
      margin-bottom: 0.1em;
    }
    img {
      width: 5em;
      position: absolute;
      top: 0.5em;
      left: 7em;
    }
  `}
`;
