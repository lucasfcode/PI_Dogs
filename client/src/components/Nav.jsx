import React from "react";
import SearchBar from "./Search";
import s from "./css/nav.module.css";
import logo from "../images/logoDogs.png";

export default function Nav({ setCurrentPage }) {
  return (
    <nav className={s.main}>
      <div className={s.main_title}>
        <a href="/home" className={s.NavLInk}>
          <img src={logo} alt="logo" />
        </a>
      </div>

      <SearchBar setCurrentPage={setCurrentPage} />
    </nav>
  );
}
