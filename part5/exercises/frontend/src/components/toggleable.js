import React, { useState } from "react";
import PropTypes from "prop-types";

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

Toggleable.propTypes = {
  showLabel: PropTypes.string,
  hideLabel: PropTypes.string,
};

export default Toggleable;
