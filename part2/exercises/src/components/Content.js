import React from "react";
import Part from "./Part";

const Content = (props) =>
  props.course.parts.map((part) => (
    <Part key={part.name} title={part.name} total={part.exercises || 0} />
  ));

export default Content;
