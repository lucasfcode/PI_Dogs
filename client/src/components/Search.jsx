import React from "react";
import { useDispatch } from "react-redux";
import { getSearchedDogs } from "../redux/actions";
import s from "./css/search.module.css";

export default function SearchBar({ setCurrentPage }) {
  const [searching, setSearching] = React.useState({
    state: "",
  });

  const dispatch = useDispatch();
  const onHandler = (e) => {
    setSearching({ state: e.target.value });
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log("kexxxxx", e.key);
    dispatch(getSearchedDogs(searching.state));
    setCurrentPage(1);
    // setSearching({ state: "" });
  };

  //retuuuuur -------------------------------
  return (
    <div className={s.searchbar_box}>
      <input
        onKeyDown={(e) => e.key === "Enter" && handlerSubmit(e)}
        className={s.input_1}
        value={searching.state}
        onChange={(e) => onHandler(e)}
        autoFocus
      />
      <button className={s.btn} onClick={(e) => handlerSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
