import React from "react";

const Content = (props) => {
  return (
    <p>
      {props.title}: {props.total}
    </p>
  );
};

export default Content;
