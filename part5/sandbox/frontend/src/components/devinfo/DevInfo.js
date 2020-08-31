import React from "react";
import "./DevInfo.css";

const DevInfo = () => {
  let envClassName;
  switch (process.env.NODE_ENV) {
    case "development":
    case "test":
      envClassName = "debug";
      break;
    case "production":
      envClassName = "prod";
      break;
    default:
      break;
  }

  return <div className={envClassName}>{process.env.NODE_ENV}</div>;
};

export default DevInfo;
