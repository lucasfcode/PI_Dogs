import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedDogs } from "../redux/actions";
import s from "./css/search.module.css";
import Dog from "./Dog";

export default function SearchBar() {
  const [searching, setSearching] = React.useState({
    state: "",
  });
  const stateRedux = useSelector((state) => state);

  const dispatch = useDispatch();
  const onHandler = (e) => {
    setSearching({ state: e.target.value });
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(getSearchedDogs(searching.state));
    setSearching({ state: "" });
  };

  //retuuuuur -------------------------------
  return (
    <div className={s.searchbar_box}>
      <input
        className={s.input_1}
        value={searching.state}
        onChange={(e) => onHandler(e)}
        autoFocus
      />
      <button className={s.input_1} onClick={(e) => handlerSubmit(e)}>
        Buscar
      </button>

      {/* paginado----------- */}

      {/* ----------------searching div-------------- */}
    </div>
  );
}
