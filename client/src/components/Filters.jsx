import React from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  filterByTemp,
  getAllDogs,
  ascOrder,
  descOrder,
  getCreated,
  getOnlyApi,
} from "../redux/actions";
import s from "./css/filters.module.css";

export function Filters({ setCurrentPage }) {
  const temperaments = useSelector((state) => state.temperaments);
  let tempsOrdened = temperaments.map((e) => e.name).sort();
  const dispatcher = useDispatch();
  const [selected, setSelected] = React.useState([]);
  //si target.checked es true agregar, sino redefinir quitando los nombres que no esten en true
  const createdHandler = (value) => {
    console.log("from createdH", value);
    value === "created"
      ? dispatcher(getCreated())
      : value === "api"
      ? dispatcher(getOnlyApi())
      : getAllDogs(dispatcher);
  };
  const checkHandler = (event) => {
    let temp = event.target;
    let name = temp.name.toUpperCase();
    temp.checked
      ? setSelected((prev) => [...prev, name])
      : setSelected((prev) => prev.filter((e) => e !== name));
  };
  const applyHandler = () => {
    console.log("Aplicando Cambios");
    selected.length
      ? dispatcher(filterByTemp(selected))
      : getAllDogs(dispatcher);
  };
  const resetHandler = () => {
    console.log("Filtros reseteados");
    getAllDogs(dispatcher);
  };

  const orderHandler = (value) => {
    console.log("value order", value);
    value === "asc"
      ? dispatcher(ascOrder())
      : value === "desc"
      ? dispatcher(descOrder())
      : console.log("error en orderHandler");
  };
  return (
    <div className={s.filter_box}>
      <select
        onChange={(e) => orderHandler(e.target.value)}
        className={s.select}
      >
        <option key={"asc"} value="asc">
          Ascendente
        </option>
        <option key={"desc"} value="desc">
          Descendente
        </option>
      </select>

      <select
        onChange={(e) => createdHandler(e.target.value)}
        className={s.select}
      >
        <option value="all">Todos</option>
        <option value="api">Api</option>
        <option value="created">Creados</option>
      </select>

      <div className={s.temperaments}>
        <h3>Filtrar por Temperamento</h3>
        <br />

        <br />
        {/* ---------Filtrar por temperamento */}
        {tempsOrdened.length ? (
          tempsOrdened.map((t, id) => (
            <label key={id} className={s.label}>
              <input
                onChange={(e) => checkHandler(e)}
                type="checkbox"
                key={id * 2}
                name={t}
              />
              {t}
            </label>
          ))
        ) : (
          <span>No se recuperaron los temperamentos</span>
        )}
      </div>
      <div>
        <button onClick={applyHandler}>Aplicar</button>
        <button onClick={resetHandler}>Resetear</button>
      </div>
      <NavLink to="/home/create">Crear Perro</NavLink>
    </div>
  );
}
