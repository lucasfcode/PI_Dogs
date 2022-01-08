import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTemp } from "../redux/actions";
import s from "./css/filters.module.css";

export function Filters({ setCurrentPage }) {
  const temperaments = useSelector((state) => state.temperaments);
  const allDogs = useSelector((state) => state.filtered);
  const dispatcher = useDispatch();
  const [selected, setSelected] = React.useState([]);
  //si target.checked es true agregar, sino redefinir quitando los nombres que no esten en true
  const checkHandler = (event) => {
    let temp = event.target;
    let name = temp.name.toUpperCase();

    temp.checked
      ? setSelected((prev) => [...prev, name])
      : setSelected((prev) => prev.filter((e) => e !== name));

    //Arreglo principal incluye  alguno de los elementos del array checked?
    //recorremos mi array de condiciones y en cada elemento preguntamos si está incluido en al menos un elemento del segundo array (temperaments)
    // recorro cada dog--> en cada dog pregunto si existe algun elemento de selected en los temperamentos del dog acual.
    //esta funcion me costó

    let filtered = allDogs.filter((dog) => {
      let dTemp = dog.temperament.map((e) => e.toUpperCase());
        console.log("dTemp", dTemp);
      return selected.some(
        (temp) => dTemp.length && dTemp.includes(temp))
      )
    });
    console.log("filteredddd", filtered);
    // dispatcher(filterByTemp(filtered));
  };
  console.log(selected);

  return (
    <div className={s.filter_box}>
      <select className={s.select}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>

      <select className={s.select}>
        <option value="all">Todos</option>
        <option value="api">Api</option>
        <option value="created">Creados</option>
      </select>

      <div className={s.temperaments}>
        <h3>Filtrar por Temperamento</h3>
        <br />

        <br />
        {temperaments.length ? (
          temperaments.map((t) => (
            <>
              <label key={t.id} className={s.label}>
                <input
                  onChange={(e) => checkHandler(e)}
                  type="checkbox"
                  key={t.id}
                  name={t.name}
                />
                {t.name}
              </label>
            </>
          ))
        ) : (
          <span>No se recuperaron los temperamentos</span>
        )}
      </div>
    </div>
  );
}
