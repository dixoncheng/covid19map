import { render } from "react-dom";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from "../components/useMeasure";

const Anim = () => {
  const [open, toggle] = useState(false);
  const [bind, { width }] = useMeasure();
  const props = useSpring({
    width: open ? width : 0,
    onRest() {
      console.log("onRest");
    },
  });

  return (
    <div {...bind} class="main" onClick={() => toggle(!open)}>
      <animated.div className="fill" style={props} />
      <animated.div className="content">
        {props.width.interpolate((x) => x.toFixed(0))}
      </animated.div>
    </div>
  );
};

const Test = () => (
  <div>
    <Anim />
    <Anim />
  </div>
);

export default Test;
