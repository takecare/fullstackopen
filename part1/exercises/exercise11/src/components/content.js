import React from "react";

const Content = (props) =>
  props.parts.map((part) => (
    <p key={part.title}>
      {part.title}: {part.total}
    </p>
  ));

export default Content;
