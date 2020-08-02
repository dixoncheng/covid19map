import styled, { css } from "styled-components";

const StyledRow = styled.div`
  ${({ theme, ...props }) => css`
    /* font-size: 2vw; */
    margin: 2em 0;
    justify-content: space-between;
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        font-size: 1vw;
      }
    `}

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 0em 2em;
      margin: 2em 0;
      ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          margin: 0;
          grid-gap: 0;
        }
      `}
    }

    .date-mobile {
      margin-left: 2.5em;
      ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          display: none;
        }
      `}
    }

    > div {
      margin-top: 0.7em;
      margin-bottom: 0.7em;
    }
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        display: flex;
        padding: 0 2.5em;
        > div {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
    `}
    .flex-mobile {
      display: flex;
      justify-content: space-between;
      align-items: center;

      ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
        }
      `}
    }
  `}
`;

const Row = ({ children }) => {
  return <StyledRow>{children}</StyledRow>;
};

export default Row;
