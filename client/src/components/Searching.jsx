import React from "react";
import s from "./css/search.module.css";
export default function Searching(props) {
  console.log("props searching", props);
  return (
    <h3>
      <a href="#">{props.name}</a>
    </h3>
  );
}
