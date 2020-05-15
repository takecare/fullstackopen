import React from "react";

const Total = (props) => {
  const total = props.course.parts.reduce(
    (acc, part) => acc + part.exercises,
    0
  );
  return <p>Number of exercises: {total}</p>;
};

export default Total;
