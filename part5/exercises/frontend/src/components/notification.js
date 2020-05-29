import React, { useState, useEffect, useMemo } from "react";

const notificationStyle = {
  margin: "0.3em",
  border: "3px solid green",
  backgroundColor: "#ffeeff",
};
const hiddenStyle = {
  visibility: "hidden",
};

const Notification = ({ message, onHidden }) => {
  const [storedTimeout, saveTimeout] = useState(null);
  const [style, setStyle] = useState(hiddenStyle);

  const clear = useMemo(() => {
    clearTimeout(storedTimeout);
    saveTimeout(null);
  }, [storedTimeout]);

  useEffect(() => {
    if (!message || message.length === 0) {
      return;
    }

    const timeout = setTimeout(() => {
      saveTimeout(null);
      setStyle(hiddenStyle);
      onHidden();
    }, 5000);

    saveTimeout(timeout);
    setStyle(notificationStyle);
    return clear;
  }, [message, onHidden]);

  return <div style={style}>{message}</div>;
};

export default Notification;
