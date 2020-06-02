import React from "react";
import PropTypes from "prop-types";

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

Notification.propTypes = {
  notification: PropTypes.exact({
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
  }),
};

export default Notification;
