import React, { useState } from "react";

const hiddenStyle = { display: "none" };
const visibleStyle = {};

const Toggleable = ({ showLabel, hideLabel, children }) => {
  const [hidden, setHiden] = useState(true);
  return (
    <>
      <button onClick={() => setHiden(!hidden)}>
        {hidden ? showLabel || "show" : hideLabel || "hide"}
      </button>
      <div style={hidden ? hiddenStyle : visibleStyle}>{children}</div>
    </>
  );
};

export default Toggleable;
