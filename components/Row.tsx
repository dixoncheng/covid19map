import styled, { css } from "styled-components";

const StyledRow = styled.div`
  ${({ theme }) => css`
    /* font-size: 2vw; */
    margin: 2em 0;
    justify-content: space-between;

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 0em 2em;
      margin: 2em 0;
    }

    .date-mobile {
      margin-left: 2.5em;
    }

    > div {
      margin-top: 0.7em;
      margin-bottom: 0.7em;
    }

    .flex-mobile {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `}
`;

const Row = ({ children }: { children: React.ReactNode }) => {
  return <StyledRow>{children}</StyledRow>;
};

export default Row;
