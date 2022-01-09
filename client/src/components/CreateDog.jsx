import React from "react";
import s from "./css/create.module.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function CreateDog() {
  const temperaments = useSelector((state) =>
    state.temperaments.map((e) => e.name).sort()
  );
  //los temperamentos se han guardado en un estado aparte para que no renderice todo, por el cambio del mismo
  const [selectedTemps, setSelectedTemps] = React.useState([]);

  const [formState, setformState] = React.useState({
    name: "",
    image: "",
    height: "",
    live: "",
    description: "",
  });

  const onName = (v) =>
    setformState((prev) => {
      return {
        ...prev,
        name: v.target.value,
      };
    });
  const onImage = (v) =>
    setformState((prev) => {
      return { ...prev, image: v.target.value };
    });
  const onHeight = (v) =>
    setformState((prev) => {
      return { ...prev, height: v.target.value };
    });
  const onLive = (v) =>
    setformState((prev) => {
      return { ...prev, live: v.target.value };
    });
  const onDescription = (v) =>
    setformState((prev) => {
      return { ...prev, description: v.target.value };
    });
  const onTemperament = (value) => {
    if (!selectedTemps.includes(value.target.value))
      setSelectedTemps((prev) => [...prev, value.target.value]);
    else console.log("Ya seleccionaste el temperamento", value.target.value);
  };

  const deleteTemp = (e) => {
    //se borra comparando los nombres
    e.preventDefault();
    setSelectedTemps((prev) => prev.filter((t) => t !== e.target.name));
  };
  const resetAll = () => {
    setformState({
      name: "",
      image: "",
      height: "",
      live: "",
      description: "",
    });
    setSelectedTemps([]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let combined = { ...formState, temperaments: selectedTemps };
    console.log("se enviará", combined);
    resetAll();
  };

  return (
    <section>
      <NavLink to="/home">Home</NavLink>
      <form onSubmit={(e) => onSubmit(e)} onReset={resetAll} className={s.form}>
        <h1>Crea tu propia raza</h1>

        <label value="Raza">
          <span>Raza </span>
          <input
            onChange={(e) => onName(e)}
            type="text"
            name="name"
            autoFocus
            value={formState.name}
          />
        </label>

        {/* image--------- */}
        <label htmlFor="image">Imagen</label>
        <input
          onChange={(e) => onImage(e)}
          type="text"
          name="image"
          placeholder="Url de la imagen.."
          value={formState.image}
        />
        {/* Height------------ */}
        <label htmlFor="height">Altura</label>
        <input
          onChange={(e) => onHeight(e)}
          type="text"
          name="height"
          value={formState.height}
        />
        {/* Live-------------- */}
        <label htmlFor="live">Años de vida</label>
        <input
          onChange={(e) => onLive(e)}
          type="text"
          name="live"
          value={formState.live}
        />
        {/*  temeperament---------*/}
        <label>Temperamento</label>
        <select onChange={(e) => onTemperament(e)}>
          {temperaments.length ? (
            temperaments.map((temp, idx) => (
              <option key={temp} value={temp}>
                {temp}
              </option>
            ))
          ) : (
            <option>Cargando...</option>
          )}
        </select>
        <div>
          {selectedTemps.map((temp) => (
            <span key={temp}>
              {temp}
              <button name={temp} onClick={(e) => deleteTemp(e)}>
                X
              </button>
            </span>
          ))}
        </div>

        {/* description--------- */}
        <label htmlFor="description">Descripcion</label>
        <textarea
          onChange={(e) => onDescription(e)}
          cols="20"
          rows="10"
          name="description"
          value={formState.description}
        />
        <br />
        <input type="submit" />
        <input type="reset" />
      </form>
      ;
    </section>
  );
}
