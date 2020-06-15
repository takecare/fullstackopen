import React, { useState, useImperativeHandle } from 'react';

const Togglable = ({ label, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);
  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={showWhenVisible} className="content">
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default React.forwardRef(Togglable);
