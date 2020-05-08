import React from "react";

const Total = (props) => {
  const total = props.course.parts.reduce(
    (acc, part) => acc + (part.exercises || 0),
    0
  );
  return (
    <p>
      <b>Number of exercises: {total}</b>
    </p>
  );
};

export default Total;
