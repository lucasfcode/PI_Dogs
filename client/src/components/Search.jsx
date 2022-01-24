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
    if (searching.state.length) {
      dispatch(getSearchedDogs(searching.state));
      setCurrentPage(1);
    } else alert("El campo de busqueda está vacío!");

    // setSearching({ state: "" });
  };

  //retuuuuurn-------------------------------
  return (
    <div className={s.searchbar_box}>
      <input
        placeholder="Buscar una raza..."
        onKeyDown={(e) => e.key === "Enter" && handlerSubmit(e)}
        className={s.input_1}
        value={searching.state}
        onChange={(e) => onHandler(e)}
      />
      <button className={s.btn} onClick={(e) => handlerSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
