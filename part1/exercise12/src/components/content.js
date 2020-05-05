import React from "react";
import Part from "./Part";

const Content = (props) =>
  props.parts.map((part) => (
    <Part key={part.title} title={part.title} total={part.total} />
  ));

export default Content;
