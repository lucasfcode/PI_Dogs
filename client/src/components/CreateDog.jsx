import React from "react";
import s from "./css/create.module.css";

export default function CreateDog() {
  const [formState, setformState] = React.useState({});
  const temperaments = useSelector((state) => state.temperaments);
  let tempsOrdened = temperaments.map((e) => e.name).sort();
  const onForm = (e) => {
    setformState((prev) => {
      return {
        ...prev,
        [e.target.name]: [e.target.value],
      };
    });
  };
  console.log(formState);
  return (
    <section>
      <form onChange={(e) => onForm(e)} className={s.form}>
        <h1>Crea tu propia raza</h1>
        <label htmlFor="name" value="Raza">
          <span>Raza </span>
          <input type="text" name="name" autoFocus value={formState.name} />
        </label>
        <label htmlFor="image">Raza</label>
        <input
          type="text"
          name="image"
          placeholder="Url de la imagen.."
          value={formState.image}
        />
        <label htmlFor="height">Altura</label>
        <input type="text" name="height" value={formState.height} />
        <label htmlFor="live">Años de vida</label>
        <input type="text" name="live" value={formState.live} />
        <label htmlFor="temperament">Temperamento</label>
        <select></select>
        <input type="text" name="temperament" value={formState.temperament} />
        <label htmlFor="description">Descripcion</label>
        <textarea
          cols="20"
          rows="10"
          name="description"
          value={formState.description}
        />
        <br />
        <input type="submit" />
      </form>
      ;
    </section>
  );
}
