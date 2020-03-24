import Head from "next/head";

import styled, { css } from "styled-components";

const Stats = () => {
  return (
    <div className="container">
      <Head>
        <title>Covid-19 Map NZ - Stats</title>
      </Head>
      <Infographic>
        <Header>as of 23 March 2020</Header>
        <Row>
          <Total>
            <h1>
              Total cases <br />
              in New Zealand
            </h1>
            <TotalNumber>
              <span>1</span>
              <span>5</span>
              <span>5</span>
            </TotalNumber>
          </Total>
          <div>
            <Alert>
              <div className="head" />
              <div className="body">
                Alert level<div>2</div>
              </div>
            </Alert>
          </div>
        </Row>
      </Infographic>
    </div>
  );
};

export default Stats;

const Infographic = styled.div`
  ${({ theme }) => css`
    font-size: 1vw;
    background: #d9f4f3;
    @media (min-width: ${theme.sm}) {
    }
  `}
`;

const Header = styled.div`
  ${({ theme }) => css`
    font-size: 1.2em;
    color: white;
    padding: 0 2.5em;
    height: 2.5em;
    display: flex;
    align-items: center;
    background: ${theme.navy};
  `}
`;

const Row = styled.div`
  ${({ theme }) => css`
    /* display: grid;
    grid-gap: 2em;
    grid-template: 1fr; */

    display: flex;
    padding: 2em 2.5em;
    justify-content: space-between;

    @media (min-width: ${theme.sm}) {
    }
  `}
`;

const Total = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    font-size: 1.45em;
    h1 {
      font-weight: normal;
      margin: 0 1em 0 0;
      font-size: 3em;
      font-family: ${theme.fontFancy};
      color: ${theme.teal};
      text-transform: uppercase;
      line-height: 1.1;
    }
    @media (min-width: ${theme.sm}) {
    }
  `}
`;

const TotalNumber = styled.div`
  ${({ theme }) => css`
    color: ${theme.green};
    font-size: 6em;

    span {
      background: white;
      display: inline-block;
      border-radius: 0.1em;
      padding: 0.1em 0.12em;
      margin: 0.03em;
      font-weight: bold;
      line-height: 1;
    }
  `}
`;

const Alert = styled.div`
  ${({ theme }) => css`
    width: 21em;
    background: #fff1c1;
    position: absolute;
    top: 0;
    right: 2.5em;

    .head {
      height: 3em;
      background: url(/infographic/alertlevel.svg) no-repeat;
      background-size: cover;
    }
    .body {
      display: grid;
      grid-template-columns: 2fr auto;
      grid-gap: 0 0.5em;
      align-items: center;
      line-height: 1.1;
      color: ${theme.yellow};
      font-size: 3em;
      font-family: ${theme.fontFancy};
      font-weight: normal;
      text-transform: uppercase;
      padding: 0.5em;
      div {
        font-family: ${theme.font};
        font-weight: bold;
        font-size: 3em;
      }
    }

    @media (min-width: ${theme.sm}) {
    }
  `}
`;
