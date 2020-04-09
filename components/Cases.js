import styled, { css } from "styled-components";

const Cases = ({ confirmedTotal, probableTotal }) => {
  return (
    <StyledCases>
      <div>
        <strong>{confirmedTotal}</strong> Confirmed Cases
      </div>
      <div>
        <strong>{probableTotal}</strong> Probable Cases
      </div>
    </StyledCases>
  );
};

export default Cases;

const StyledCases = styled.div`
  ${({ theme, ...props }) => css`
    background: #a6e5e3;
    border-radius: 0.3em;
    padding: 0.5em 1em 0.5em 4.4em;
    font-size: 2.8em;
    color: ${theme.dark};
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    :before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0.7em;
      width: 3em;
      height: 3em;
      background: url(/infographic/cases.svg) center center no-repeat;
      background-size: contain;
      transform: translateY(-50%);
    }
    strong {
      color: ${theme.teal};
      display: inline-block;
      min-width: 2em;
    }
  `}
`;
