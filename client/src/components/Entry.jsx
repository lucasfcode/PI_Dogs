import React from "react";
import { NavLink } from "react-router-dom";
import s from "./css/entry.module.css";
export default function Entry() {
  return (
    <div className={s.entry}>
      <h1>Welcome to Henry Dogs</h1>
      <NavLink to={"/home"}>Ingresar</NavLink>
    </div>
  );
}
