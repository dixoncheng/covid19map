import styled, { css } from "styled-components";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "react-use";
import * as gtag from "../lib/gtag";

const Reveal = ({ button, full, children }) => {
  const defaultHeight = "0px";
  const [open, toggle] = useState(false);
  const [contentHeight, setContentHeight] = useState(defaultHeight);
  const [ref, { height }] = useMeasure();

  // Animations
  const expand = useSpring({
    // config: { friction: 10 },
    height: open ? `${contentHeight}px` : defaultHeight,
  });

  useEffect(() => {
    //Sets initial height
    setContentHeight(height);

    //Adds resize event listener
    // window.addEventListener("resize", setContentHeight(height));
    // return window.removeEventListener("resize", setContentHeight(height));
  }, [height]);

  return (
    <>
      <InvisibleButton
        onClick={() => {
          toggle(!open);
          gtag.event("Level 3 slideshow");
        }}
        active={open}
      >
        {button}
      </InvisibleButton>
      <Container full={full}>
        <animated.div style={expand}>
          <div ref={ref}>{children}</div>
        </animated.div>
      </Container>
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
      /* position: relative; */
      /* top: 1px; */
      transition: all 0.3s ease;
      transform: rotate(${active ? "90deg" : "0deg"});
    }
  `}
`;

const Container = styled.div`
  ${({ theme, full }) => css`
    overflow: hidden;
    margin: ${full ? "0 -20px" : 0};
  `}
`;
