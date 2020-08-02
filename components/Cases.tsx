import styled, { css } from "styled-components";

const StyledCases = styled.div`
  ${({ theme }) => css`
    background: #a6e5e3;
    border-radius: 0.3em;
    padding: 0.5em 1em 0.5em 4.4em;
    font-size: 2.8em;
    color: ${theme.dark};
    position: relative;
    display: flex;
    justify-content: space-between;

    :before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0.7em;
      width: 3em;
      height: 3em;
      background: url(${require(`../public/infographic/cases.svg`)}) center
        center no-repeat;
      background-size: contain;
      transform: translateY(-50%);
    }
    > div {
      text-align: center;
      font-size: 0.6em;
      padding: 0.2em 0;
    }
    strong {
      color: ${theme.teal};
      display: block;
      min-width: 2em;
      font-size: 2.2em;
      line-height: 1;
    }
  `}
`;

const Cases = ({
  confirmedTotal,
  probableTotal,
  combinedTotal,
}: {
  confirmedTotal: number;
  probableTotal: number;
  combinedTotal: number;
}) => (
  <StyledCases>
    <div>
      <strong>{combinedTotal}</strong> Total
    </div>
    <div>
      <strong>{confirmedTotal}</strong> Confirmed
    </div>
    <div>
      <strong>{probableTotal}</strong> Probable
    </div>
  </StyledCases>
);

export default Cases;
