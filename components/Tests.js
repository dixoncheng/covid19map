import styled, { css } from "styled-components";

const Tests = ({ tests }) => {
  return (
    <StyledTests>
      <strong>{tests}</strong> <span>tests processed yesterday</span>
      <img src={require(`../public/infographic/testing.svg`)} />
    </StyledTests>
  );
};

export default Tests;

const StyledTests = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    background-color: #d9e8eb;
    border-radius: 0.5em;
    padding: 0.5em 2em;
    strong {
      color: ${theme.teal};
      font-family: ${theme.fontFancy};
      font-size: 3.5em;
      margin-right: 0.3em;
      letter-spacing: 0.05em;
    }
    span {
      font-size: 1.8em;
    }
    img {
      position: absolute;
      top: 50%;
      right: 0;
      width: 7em;
      transform: translateY(-50%);
    }
  `}
`;
