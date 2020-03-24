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
        <Row>
          <Cases>
            <div>
              <strong>142</strong> Confirmed Cases
            </div>
            <div>
              <strong>13</strong> Probable Cases
            </div>
          </Cases>
          <Recovered>
            <div>
              <strong>12</strong> Recovered
            </div>
            <div>
              Recovery
              <br />
              Rate
              <br />
              <strong>8%</strong>
            </div>
            <div>
              <People percent={8} />
            </div>
          </Recovered>
          <Deaths>
            <strong>0</strong>Deaths
          </Deaths>
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
    display: flex;
    padding: 0 2.5em;
    margin: 2em 0;
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

const Cases = styled.div`
  ${({ theme }) => css`
    background: #a6e5e3;
    border-radius: 0.3em;
    padding: 0.5em 1em 0.5em 3em;
    font-size: 2.8em;
    color: ${theme.dark};
    position: relative;

    :before {
      content: "";
      position: absolute;
      top: 50%;
      left: -0.5em;
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

const Recovered = styled.div`
  ${({ theme }) => css`
    flex: 1;
    margin: 0 1em;
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

  console.log(`peopleToFill: ${peopleToFill}`);
  console.log(`partPersonToFill: ${partPersonToFill}`);
  return (
    <>
      {[...Array(10)].map((item, i) => {
        // console.log(i);
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
            <div className="fill"></div>
            <div
              dangerouslySetInnerHTML={{
                __html: require(`../public/infographic/recovery.svg?include`)
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
    overflow: hidden;
    background: ${theme.dark};
    .fill {
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      width: 100%;
      height: ${fill * 100}%;
      background: white;
    }
    svg {
      position: relative;
      z-index: 2;
      width: 100%;

      display: block;
    }
  `}
`;

const Deaths = styled.div`
  ${({ theme }) => css`
    padding: 0.5em 1em;
    background: ${theme.green};
    font-size: 2.2em;
    border-radius: 0.3em;
    color: ${theme.dark};
    strong {
      display: block;
      line-height: 1;
      font-size: 2.3em;
      color: white;
    }
  `}
`;
