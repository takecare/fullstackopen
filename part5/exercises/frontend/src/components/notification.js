import React from "react";

const notificationStyle = {
  margin: "0.3em",
  border: "3px solid green",
  backgroundColor: "#ffffff",
};
const errorStyle = {
  margin: "0.3em",
  border: "3px solid red",
  backgroundColor: "#ffeeff",
};

const Notification = ({ notification }) => {
  if (!notification) {
    return <></>;
  }
  const { message, isError } = notification;
  const style = isError ? errorStyle : notificationStyle;
  return <div style={style}>{message}</div>;
};

export default Notification;
