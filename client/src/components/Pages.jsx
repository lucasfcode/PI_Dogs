import React from "react";
import s from "./css/home.module.css";

export default function Pages({
  allDogs,
  setCurrentPage,
  render,
  currentPage,
}) {
  const pageNumbers = allDogs
    .map((e, index) => index + 1)
    .slice(0, Math.ceil(allDogs.length / render));

  return (
    <div className={s.pages}>
      <ul>
        {pageNumbers.length &&
          pageNumbers.map((number) => (
            <li
              onClick={() => setCurrentPage(number)}
              className={currentPage === number ? s.active : ""}
            >
              {number}
            </li>
          ))}
      </ul>
    </div>
  );
}
