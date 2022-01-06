import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedDogs } from "../redux/actions";
import s from "./css/search.module.css";
import Dog from "./Dog";
import Searching from "./Searching";

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

  console.log("searchedREduxAfter", stateRedux);
  //retuuuuur -------------------------------
  return (
    <div>
      <input
        className={s.input_1}
        value={searching.state}
        onChange={(e) => onHandler(e)}
        autoFocus
      />
      <button className={s.input_1} onClick={(e) => handlerSubmit(e)}>
        Buscar
      </button>
      {/* ----------------searching div-------------- */}
      {searching.state.length && (
        <div className={s.searching}>
          {stateRedux.dogs
            .filter((e) =>
              e.name.toUpperCase().includes(searching.state.toUpperCase())
            )
            .map((dog) => (
              <Searching name={dog.name} key={dog.id} />
            ))}
        </div>
      )}

      <div className={s.show}>
        {stateRedux.state &&
          stateRedux.state.map((e) => {
            return <Dog stateRedux={e} key={e.id} />;
          })}
      </div>
    </div>
  );
}
