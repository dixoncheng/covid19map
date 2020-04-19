import styled, { css } from "styled-components";

const InvisibleButton = styled.button`
  ${({ theme, active }) => css`
    font-size: 1em;
    text-align: left;
    background: none;
    padding: 0;
    border: none;
    .head {
      margin-top: 0;
    }
    .icon {
      display: inline-block;
      width: 0.5em;
      /* height: 0.6em; */
      /* position: relative; */
      /* top: 1px; */
      transition: all 0.3s ease;
      transform: rotate(${active ? "90deg" : "0deg"});
    }
  `}
`;

export default InvisibleButton;
