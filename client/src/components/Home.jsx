import Search from "./Search";
import React from "react";
import s from "./css/home.module.css";

export default function Home() {
  return (
    <div className={s.home}>
      <Search />
    </div>
  );
}
