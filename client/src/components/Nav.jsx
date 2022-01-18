import React from "react";
import SearchBar from "./Search";
import s from "./css/nav.module.css";

export default function Nav({ setCurrentPage }) {
  return (
    <nav className={s.main}>
      <h1 className={s.main_title}>
        <a href="/home" className={s.NavLInk}>
          Dogs App{" "}
        </a>
      </h1>

      <SearchBar setCurrentPage={setCurrentPage} />
    </nav>
  );
}
