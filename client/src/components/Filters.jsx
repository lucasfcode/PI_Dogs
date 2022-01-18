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
  getAllSelect,
  orderByName,
  orderByWeight,
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

  //estado controlador del selector all, api, created
  const [orderBy, setOrderby] = React.useState("abc");
  //estado de orden ascendente o descendente
  const [order, setOrder] = React.useState("asc");

  const [all, setAll] = React.useState("");

  //si target.checked es true agregar, sino redefinir quitando los nombres que no esten en true
  const createdHandler = (value) => {
    //seteo el estado que maneja 'Todos' en el select
    setAll(value);
    //limpio el array de filtros para que no se acumulen
    setSelected([]);
    //seteo el orderBy con su handler
    orderByH("abc");
    //reseteo los checkboxs
    setCheckedState(new Array(124).fill(false));

    if (value === "created") {
      dispatcher(getCreated());
      //seteo a 1 el paginado, para que renderice bien
      setCurrentPage(1);
    } else if (value === "api") {
      dispatcher(getOnlyApi());
    } else {
      //traigo a todos los perros
      resetHandler();
      //llamo a todos los dog otra vez
      getAllSelect();
    }
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
    //valor de lprimer select
    let conditional = all;
    if (selected.length) {
      //aplico los filtros anteriores (selected, order, api) para que filtered vuelva a recargar los dogs
      //y que no queden residuos de algun filtro anterior
      // console.log(
      //   "por filtrar: dentro de applyHandler entro en el if ",
      //   selected
      // );
      //aplico el reducer de filtros a todos los dogs
      dispatcher(filterByTemp(conditional, selected));
    }
    //seteo el orden y asc
    orderByH("abc");
    orderHandler("asc");
    setCurrentPage(1);
  };

  //ordenar
  //orderBy namo or weight handler
  const orderByH = (option) => {
    setOrderby(option);

    if (option === "abc") {
      dispatcher(orderByName(option));
      //reseteo el filtro debajo (asc o desc)
      setOrder("asc");
    } else {
      dispatcher(orderByWeight(option));
      //reseteo el filtro debajo (asc o desc)
      setOrder("asc");
    }
  };
  const orderHandler = (value) => {
    setOrder(value);
    value === "asc"
      ? dispatcher(ascOrder(orderBy))
      : value === "desc"
      ? dispatcher(descOrder(orderBy))
      : console.error("error en orderHandler");
  };

  //resetear filtros
  const resetHandler = () => {
    // console.log("Filtros reseteados");
    setCheckedState(new Array(124).fill(false));
    setAll("all");
    setOrder("asc");
    setOrderby("abc");
    dispatcher(ascOrder());
    getAllDogs(dispatcher);
    setSelected([]);
  };

  return (
    <div className={s.filter_box}>
      <div className={s.selects_box}>
        {/* ----------------all api created ----------------*/}
        <select
          onChange={(e) => createdHandler(e.target.value)}
          className={s.select}
          value={all}
        >
          <option value="all">Todos</option>
          <option value="api">Api</option>
          <option value="created">Creados</option>
        </select>
        {/* --------Peso o Alfabeto --------*/}
        <select
          className={s.select}
          value={orderBy}
          name=""
          id=""
          onChange={(e) => orderByH(e.target.value)}
        >
          <option value="abc">Alfabeticamente</option>
          <option value="peso">Por peso</option>
        </select>
        {/* Ascendente o Descendente */}
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
      </div>

      {/* --------temperament-------------- */}
      <div className={s.temperaments}>
        <h3>Filtrar por Temperamento</h3>
        <br />

        <br />
        {/* ---------Filtrar por temperamento */}
        {tempsOrdened.length ? (
          tempsOrdened.map((t, id) => (
            <label key={id} className={`${s.label}`}>
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
          <div className={s.notTemps}>
            Aún no se recuperaron los temperamentos
          </div>
        )}
      </div>
      <div className={s.btns}>
        <button className={s.apply_btn} onClick={applyHandler}>
          Aplicar temperamentos
        </button>
        <button className={s.reset_btn} onClick={resetHandler}>
          Resetear
        </button>
      </div>

      <NavLink to="/home/create" className={s.create_btn_div}>
        Crear Perro
      </NavLink>
    </div>
  );
}
