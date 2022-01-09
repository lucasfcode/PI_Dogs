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
  const dispatcher = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  let tempsOrdened = temperaments.map((e) => e.name).sort();
  //seteo el default manualmente porque tomando el valor de tempsOrdened.length no me funciona
  const [checkedState, setCheckedState] = React.useState(
    new Array(124).fill(false)
  );
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [all, setAll] = React.useState("");

  //si target.checked es true agregar, sino redefinir quitando los nombres que no esten en true
  const createdHandler = (value) => {
    console.log("from createdH", value);
    setAll(value);
    value === "created"
      ? dispatcher(getCreated())
      : value === "api"
      ? dispatcher(getOnlyApi())
      : getAllDogs(dispatcher);
  };
  //maneja checkboxs
  const checkHandler = (event) => {
    let temp = event.target;
    let name = temp.name.toUpperCase();
    let checkCopy = [...checkedState];
    //actualizo la copia del estado de checkboxs
    checkCopy[temp.id] = checkedState[temp.id] === false ? true : false;
    setCheckedState(checkCopy);

    temp.checked
      ? setSelected((prev) => [...prev, name])
      : setSelected((prev) => prev.filter((e) => e !== name));
  };
  //aplicar filtros
  const applyHandler = () => {
    console.log("Aplicando Cambios");
    selected.length
      ? dispatcher(filterByTemp(selected))
      : getAllDogs(dispatcher);
  };

  //ordenar
  const orderHandler = (value) => {
    setOrder(value);
    value === "asc"
      ? dispatcher(ascOrder())
      : value === "desc"
      ? dispatcher(descOrder())
      : console.log("error en orderHandler");
  };
  //resetear filtros
  const resetHandler = () => {
    console.log("Filtros reseteados");
    setCheckedState(new Array(124).fill(false));
    setAll("all");
    setOrder("asc");
    dispatcher(ascOrder());
    getAllDogs(dispatcher);
  };

  return (
    <div className={s.filter_box}>
      <select
        onChange={(e) => orderHandler(e.target.value)}
        className={s.select}
        value={order}
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
        value={all}
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
                checked={checkedState[id]}
                id={id}
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
