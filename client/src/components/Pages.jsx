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
  const activeHandler = (number) => {
    setCurrentPage(number);
    window.scrollTo(0, 0);
  };

  return (
    <div className={s.pages}>
      <ul>
        {pageNumbers.length &&
          pageNumbers.map((number, i) => (
            <li
              key={i}
              onClick={() => activeHandler(number)}
              className={currentPage === number ? s.active : ""}
            >
              {number}
            </li>
          ))}
      </ul>
    </div>
  );
}
