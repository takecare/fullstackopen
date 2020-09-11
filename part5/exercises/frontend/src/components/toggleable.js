import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const hiddenStyle = { display: 'none' };
const visibleStyle = {};

const Toggleable = React.forwardRef(
  ({ 'data-testid': dataTestId, showLabel, hideLabel, children }, ref) => {
    const [hidden, setHiden] = useState(true);

    useImperativeHandle(ref, () => ({ toggle: () => setHiden(!hidden) }), [
      hidden,
    ]);

    return (
      <div data-testid={dataTestId}>
        <button data-testid="toggle" onClick={() => setHiden(!hidden)}>
          {hidden ? showLabel || 'show' : hideLabel || 'hide'}
        </button>
        <div
          data-testid="toggleable-content"
          style={hidden ? hiddenStyle : visibleStyle}
        >
          {children}
        </div>
      </div>
    );
  }
);

Toggleable.displayName = 'Toggleable';

Toggleable.propTypes = {
  'data-testid': PropTypes.string,
  showLabel: PropTypes.string,
  hideLabel: PropTypes.string,
};

export default Toggleable;
