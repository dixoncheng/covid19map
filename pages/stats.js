import Head from "next/head";

import styled, { css } from "styled-components";

const Stats = () => {
  return (
    <div className="container">
      <Head>
        <title>Covid-19 Map NZ - Stats</title>
      </Head>
      <Infographic>
        <Row>
          <Total>
            <h1>Confirmed cases in New Zealand</h1>
            <small>as of 23 March 2020</small>
          </Total>
          <Alert>
            Alert level<div>2</div>
          </Alert>
        </Row>
      </Infographic>
    </div>
  );
};

export default Stats;

const teal = "#00B6AE";

const Infographic = styled.div`
  ${({ theme }) => css`
    font-size: 1vw;
    background: #d9f4f3;
    @media (min-width: ${theme.sm}) {
    }
  `}
`;

const Row = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${theme.sm}) {
    }
  `}
`;

const Total = styled.div`
  ${({ theme }) => css`
    h1 {
      margin: 0;
      font-size: 3em;
      color: ${teal};
    }
    @media (min-width: ${theme.sm}) {
    }
  `}
`;

const Alert = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${theme.sm}) {
    }
  `}
`;
