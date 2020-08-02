import styled, { css } from "styled-components";

const StyledHospital = styled.div`
  ${({ theme, ...props }) => css`
    background: white;
    border-radius: 0.5em;
    padding: 2em;
    color: ${theme.dark};
    font-family: ${theme.fontFancy};

    text-transform: uppercase;
    line-height: 1.1;
    /* margin-bottom: 2em; */
    /* 
    @media (min-width: ${theme.sm}) { */
      /* margin-right: 3em; */
      /* margin-bottom: 0; */
    /* } */
    .head {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.5em;
    }
    strong {
      font-size: 4.8em;
      color: ${theme.yellow};
      margin-right: 0.25em;
      letter-spacing: 0;
    }
    span {
      font-size: 1.8em;
    }
    img {
      display: block;
      width: 10em;
      margin: 0 auto -2em;
    }
  `}
`;

const Hospital = ({ hospitalTotal }) => (
  <StyledHospital>
    <div className="head">
      <strong>{hospitalTotal}</strong>
      <span>
        Cases in
        <br /> hospital
      </span>
    </div>
    <div className="row">
      <img src={require(`../public/infographic/hospital.svg`)} />
      {/* <div>are in Intensive Care Unit</div> */}
    </div>
  </StyledHospital>
);

export default Hospital;
