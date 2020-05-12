import React from "react";
import "./notification.css";

const Notification = ({ message }) => {
  const stlyes = message.isError ? "error" : "message";
  return message.text ? (
    <div className={`notification ${stlyes}`}>{message.text}</div>
  ) : null;
};

export default Notification;
