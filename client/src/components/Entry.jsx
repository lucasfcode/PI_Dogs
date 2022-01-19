import React from "react";
import { NavLink } from "react-router-dom";
import s from "./css/entry.module.css";
export default function Entry() {
  return (
    <div className={s.entry}>
      <div className={s.nine}>
        <h1 className={s.h1}>
          Encuentra tu <del>Camino</del> Canino{" "}
          <span className={s.link_box}>
            <NavLink to={"/home"} className={s.ingresar}>
              Ingresar
            </NavLink>
          </span>
        </h1>
      </div>
    </div>
  );
}
