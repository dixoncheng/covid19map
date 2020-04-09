import styled, { css } from "styled-components";

const Recovered = ({ recoveredTotal, combinedTotal }) => {
  const recoveryRate = Math.round((recoveredTotal / combinedTotal) * 100);
  return (
    <StyledRecovered>
      <div>
        <strong>{recoveredTotal}</strong> Recovered
      </div>
      <div>
        Recovery
        <br />
        Rate
        <br />
        <strong>{recoveryRate}%</strong>
      </div>
      <div>
        <People percent={recoveryRate} />
      </div>
    </StyledRecovered>
  );
};

export default Recovered;

const StyledRecovered = styled.div`
  ${({ theme, ...props }) => css`
    flex: 1;
    background: ${theme.green};
    font-size: 2.2em;
    border-radius: 0.3em;
    color: ${theme.dark};
    display: grid;
    grid-template-columns: 1fr 0.8fr auto;
    grid-gap: 0 0.6em;
    align-items: center;
    justify-content: space-between;
    padding: 0.5em 1em;
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        margin: 0 0 0 1em;
      }
    `}
    > div:first-child {
      border-right: solid ${theme.dark} 0.1em;
      padding-right: 0.6em;
      strong {
        display: block;
        line-height: 1;
        font-size: 2.3em;
        color: white;
      }
    }
    > div:nth-child(2) {
      font-size: 0.8em;
      line-height: 1;
      strong {
        margin-top: 0.2em;
        display: block;
        line-height: 1;
        font-size: 1.9em;
        color: white;
      }
    }
    > div:last-child {
      display: flex;
      flex-wrap: wrap;
    }
  `}
`;

const People = ({ percent }) => {
  const peopleToFill = Math.floor(percent / 10);
  const partPersonToFill = (percent % 10) / 10;
  return (
    <>
      {[...Array(10)].map((item, i) => {
        let fill;
        if (i === peopleToFill) {
          fill = partPersonToFill;
        } else if (i < peopleToFill) {
          fill = 1;
        } else {
          fill = 0;
        }
        // console.log(fill);
        return (
          <Person key={i} fill={fill}>
            <div
              dangerouslySetInnerHTML={{
                __html: require(`../public/infographic/person.svg?include`),
              }}
            />
          </Person>
        );
      })}
    </>
  );
};

const Person = styled.div`
  ${({ theme, fill }) => css`
    display: inline;
    width: 18%;
    margin: 0.06em;
    position: relative;
    svg {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;

      display: block;
      rect {
        y: ${16.8 - 16.8 * fill};
      }
    }
  `}
`;
