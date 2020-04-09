import styled, { css } from "styled-components";

const Ages = ({ ageData, totalCasesPublished }) => {
  return (
    <StyledAges>
      <div className="head">Age Groups</div>
      <div className="chart">
        {ageData.map((item, i) => {
          const percent = Math.round(
            (item.numCases / totalCasesPublished) * 100
          );
          return (
            <Age
              key={i}
              percent={percent}
              // onMouseOver={() => setcurrentAgeIndex(i)}
            >
              {item.title}
              <strong>{percent || 1}%</strong>
            </Age>
          );
        })}
      </div>
      {/* <div className="foot">
              {currentAgeIndex !== null && (
                <>
                  <strong>{ageData[currentAgeIndex].title}:</strong>{" "}
                  {ageData[currentAgeIndex].numCases} confirmed{" "}
                  {ageData[currentAgeIndex].numCases === 1 ? "case" : "cases"}
                </>
              )}
              &nbsp;
            </div> */}
    </StyledAges>
  );
};

export default Ages;

const StyledAges = styled.div`
  ${({ theme, ...props }) => css`
    width: 100%;
    .head {
      color: ${theme.dark};
      font-family: ${theme.fontFancy};
      font-size: 2.1em;
      text-transform: uppercase;
      margin-bottom: 0.5em;
      line-height: 1.1;
    }
    .chart {
      display: flex;
      flex-direction: column;
      height: 40em;
      ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          flex-direction: row;
          height: auto;
        }
      `}
    }
    .foot {
      display: none;
      background-color: white;
      padding: 0.6em 0.8em;
      font-size: 1.6em;
      color: ${theme.dark};
      ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          display: block;
        }
      `}
      strong {
        display: block;
        color: ${theme.green};
      }
    }
  `}
`;

const Age = styled.div`
  ${({ theme, percent, ...props }) => css`
    /* cursor: pointer; */
    font-size: 1.5em;
    color: white;
    text-align: center;
    height: ${percent}%;
    display: flex;
    align-items: center;
    justify-content: center;

    line-height: 1.1;
    min-height: 1.5em;
    min-width: 2.6em;
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        font-size: 1.2em;
        width: ${percent}%;
        height: 9em;
        flex-direction: column;
      }
    `}
    strong {
      font-weight: normal;
      opacity: 0.9;
      display: block;
      :before {
        content: " - ";
        margin-left: 0.4em;
        ${props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            display: none;
          }
        `}
      }
    }
    :nth-child(1) {
      background-color: ${theme.teal};
    }
    :nth-child(2) {
      background-color: ${theme.dark};
    }
    :nth-child(3) {
      background-color: ${theme.green};
    }
    :nth-child(4) {
      background-color: #317c3f;
    }
    :nth-child(5) {
      background-color: #956828;
    }
    :nth-child(6) {
      background-color: #d4b074;
    }
    :nth-child(7) {
      background-color: ${theme.yellow};
    }
    :nth-child(8) {
      background-color: #e98e23;
    }
    :nth-child(9) {
      background-color: #af5434;
    }
    :nth-child(10) {
      background-color: #833f24;
    }
  `}
`;
