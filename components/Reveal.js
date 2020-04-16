import styled, { css } from "styled-components";
import { animated } from "react-spring";
import { useTransitionHeight } from "./useMeasure";

const Reveal = ({ button, full, children }) => {
  const [style, bind, toggle, active] = useTransitionHeight();
  const sty = {
    marginLeft: full ? "-20px" : 0,
    marginRight: full ? "-20px" : 0,
    ...style,
  };

  return (
    <>
      <InvisibleButton onClick={toggle} active={active}>
        {button}
      </InvisibleButton>
      <animated.div style={sty}>
        <div {...bind}>{children}</div>
      </animated.div>
    </>
  );
};

export default Reveal;

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
      position: relative;
      top: 1px;
      transition: all 0.3s ease;
      transform: rotate(${active ? "90deg" : "0deg"});
    }
  `}
`;
