import styled, { css } from "styled-components";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "react-use";

const InvisibleButton = styled.button<{ active: boolean }>`
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
      transition: all 0.3s ease;
      transform: rotate(${active ? "90deg" : "0deg"});
    }
  `}
`;

const Container = styled.div<{ full: boolean }>`
  ${({ full }) => css`
    overflow: hidden;
    margin: ${full ? "0 -20px" : 0};
  `}
`;

const Reveal = ({
  button,
  full,
  open,
  toggle,
  children,
}: {
  button: any;
  full: boolean;
  open: boolean;
  toggle: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  const defaultHeight = 0;

  // if (!open && !toggle) {
  //   [open, toggle] = useState(false);
  // }

  const [contentHeight, setContentHeight] = useState<number>(defaultHeight);
  const [ref, { height }] = useMeasure();

  // Animations
  const expand = useSpring({
    // config: {
    // friction: 10,
    // duration: 300,
    // },
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
      {button && (
        <InvisibleButton
          onClick={() => {
            toggle(!open);
          }}
          active={open}
        >
          {button}
        </InvisibleButton>
      )}
      <Container full={full}>
        <animated.div style={expand}>
          <div ref={ref}>{children}</div>
        </animated.div>
      </Container>
    </>
  );
};

export default Reveal;
