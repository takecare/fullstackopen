import React from "react";
import Part from "./Part";

const Content = (props) =>
  props.parts.map((part) => (
    <Part key={part.name} title={part.name} total={part.exercises} />
  ));

export default Content;
