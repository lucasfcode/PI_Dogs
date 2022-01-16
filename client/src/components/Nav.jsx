import React from "react";
import SearchBar from "./Search";
import s from "./css/nav.module.css";
import { NavLink } from "react-router-dom";
export default function Nav() {
  return (
    <nav className={s.main}>
      <h1 className={s.main_title}>
        <a href="/home" className={s.NavLInk}>
          Dogs App{" "}
        </a>
      </h1>

      <SearchBar />
    </nav>
  );
}
