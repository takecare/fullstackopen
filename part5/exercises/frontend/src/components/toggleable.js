import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const hiddenStyle = { display: "none" };
const visibleStyle = {};

const Toggleable = React.forwardRef(
  ({ showLabel, hideLabel, children }, ref) => {
    const [hidden, setHiden] = useState(true);
    useImperativeHandle(ref, () => ({ toggle: () => setHiden(!hidden) }), [
      hidden,
    ]);
    return (
      <>
        <button onClick={() => setHiden(!hidden)}>
          {hidden ? showLabel || "show" : hideLabel || "hide"}
        </button>
        <div style={hidden ? hiddenStyle : visibleStyle}>{children}</div>
      </>
    );
  }
);

Toggleable.displayName = "Toggleable";

Toggleable.propTypes = {
  showLabel: PropTypes.string,
  hideLabel: PropTypes.string,
};

export default Toggleable;
