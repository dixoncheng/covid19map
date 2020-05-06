import styled, { css } from "styled-components";

const Genders = ({ genders, regional }) => {
// console.log(genders);
  return <div />;
  const male = genders.find((x) => x.gender === "male");
  const female = genders.find((x) => x.gender === "female");
  const total = genders.reduce((prev, cur) => prev + cur.count, 0);
  const percentWomen = Math.round((female.count / total) * 100);
  const percentMen = Math.round((male.count / total) * 100);
  return (
    <StyledGenders regional={regional}>
      {!regional && <div className="head">Patient genders</div>}
      <div className="genders">
        <div className="female">
          <div>
            <strong>{percentWomen}</strong> women
          </div>
          <img src={require(`../public/infographic/female.svg`)} />
        </div>
        <div className="male">
          <div>
            <strong>{percentMen}</strong> men
          </div>
          <img src={require(`../public/infographic/male.svg`)} />
        </div>
      </div>
    </StyledGenders>
  );
};

export default Genders;

const StyledGenders = styled.div`
  ${({ theme, ...props }) => css`
    color: ${theme.dark};
    ${props.regional &&
    css`
      font-size: 0.32em;
    `}
    ${props.wide &&
    css`
      @media (min-width: ${theme.sm}) {
        /* font-size: 6em; */
        margin: 0 3.5em 1.2em;
      }
    `}
    .head {
      white-space: nowrap;
      font-family: ${theme.fontFancy};
      font-size: 2em;
      text-transform: uppercase;
      margin-bottom: 0.3em;
    }
    .genders {
      display: flex;
      justify-content: center;
    }
    .female,
    .male {
      position: relative;
      div {
        position: absolute;
        font-size: 1.5em;
        color: white;
        text-align: center;
        line-height: 1.1;
      }
      strong {
        display: block;
        font-size: 1.9em;
        font-family: ${theme.fontFancy};
        :after {
          content: "%";
          font-size: 0.6em;
          position: relative;
          top: -0.5em;
          left: 0.1em;
        }
      }
    }
    .female {
      margin-right: 1em;
      div {
        top: 1.4em;
        left: 1em;
      }
      img {
        height: 13.5em;
      }
    }
    .male {
      div {
        top: 3.2em;
        left: 0.8em;
      }
      img {
        width: 11em;
      }
    }
    .foot {
      font-size: 1.5em;
      strong {
        font-weight: normal;
        color: ${theme.teal};
      }
    }
  `}
`;
