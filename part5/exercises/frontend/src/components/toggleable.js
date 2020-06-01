import React, { useState } from "react";

const hiddenStyle = { display: "none" };
const visibleStyle = {};

const Toggleable = ({ label, children }) => {
  const [hidden, setHiden] = useState(true);

  return (
    <>
      <button
        style={hidden ? visibleStyle : hiddenStyle}
        onClick={() => setHiden(false)}
      >
        {label || "show"}
      </button>
      <div style={hidden ? hiddenStyle : visibleStyle}>
        {children}
        <button onClick={() => setHiden(true)}>cancel</button>
      </div>
    </>
  );
};

export default Toggleable;
