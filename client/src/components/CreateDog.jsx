import React from "react";
import s from "./css/create.module.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createDog } from "../redux/actions";

export default function CreateDog() {
  const temperament = useSelector((state) =>
    state.temperaments.map((e) => e.name).sort()
  );

  //los temperamentos se han guardado en un estado aparte para que no renderice todo, por el cambio del mismo
  const [selectedTemps, setSelectedTemps] = React.useState([]);

  const [formState, setformState] = React.useState({
    name: "",
    height: { min: "", max: "" },
    weight: { min: "", max: "" },
    image: "",
    yearsOfLife: { min: "", max: "" },
    description: "",
  });
  const [errors, setErrors] = React.useState({});

  const validatorFn = (form) => {
    let check = {};
    // validar name

    if (form.hasOwnProperty("name")) {
      console.log("ENTRO AL IF DE NAME");
      if (form.name.length === 0)
        check.name = "Debes completar el campo 'Raza' ";
      else if (form.name.trim().length < 1)
        check.name = "Un nombre no puede ser solo espacios en blanco";
      else if (form.name.length < 3)
        check.name = "El nombre de tu raza debe contener mas de 3 caracteres";
      else if (!form.name.split("").every((l) => /[a-zñéóúíá\s]/i.test(l))) {
        console.log("el valor contiene algo diferente a un string", form.name);
        check.name =
          "No se admiten valores diferentes a texto en el campo de Raza";
      } else {
        //si cumple con todas las condiciones, seteo lo que se renderiza en blanco
        check.name = undefined;
      }
    }

    //validar altura
    console.log("recibido en validator Fn", form);

    if (form.hasOwnProperty("height")) {
      if (!form.height.min || !form.height.max)
        check.height = "Debe completar ambos campos de 'Altura'";
      else if (Number(form.height.min) < 0 || Number(form.height.max) < 0)
        check.height = "No se admiten números negativos";
      else if (Number(form.height.min) > Number(form.height.max))
        check.height = "El rango de altura minima y maxima debe ser coherente";
      else if (Number(form.height.min) > Number(form.height.max))
        check.height = "La altura mínima no puede ser mayor a la máxima";
      else if (Number(form.height.min) > 30)
        check.height = "La altura mínima no puede superar los 30cm";
      else if (Number(form.height.max) > 110)
        check.height = "La altura máxima no puede superar los 110cm";
      else check.height = undefined;
    }

    //Validar Peso

    if (form.hasOwnProperty("weight")) {
      if (!form.weight.min || !form.weight.max)
        check.weight = "Debe completar ambos campos de 'Peso'";
      else if (form.weight.min < 0 || form.weight.max < 0)
        check.weight = "El número no puede ser negativo";
      else if (Number(form.weight.min) > Number(form.weight.max))
        check.weight = "El peso mínimo no puede ser mayor que el máximo";
      else if (Number(form.weight.min) > 20)
        check.weight = "El peso minimo no puede superar los 20kg";
      else if (Number(form.weight.max) > 82)
        check.weight = "El peso máximo no puede superar los 82kg";
      else check.weight = undefined;
    }

    // // Validar campo de imagen
    if (form.hasOwnProperty("image"))
      form.image.length < 1
        ? (check.image = "Este campo es obligatorio")
        : (check.image = undefined);

    //Validar años de vida
    if (form.hasOwnProperty("yearsOfLife")) {
      if (!form.yearsOfLife.min || !form.yearsOfLife.max)
        check.yearsOfLife = "Debe completar ambos campos de 'años de vida' ";
      else if (form.yearsOfLife.min < 0 || form.yearsOfLife.max < 0)
        check.yearsOfLife = "La edad promedio no puede ser negativa";
      else if (form.yearsOfLife.min < 0)
        check.yearsOfLife = "La edad minima debe ser mayor a 1";
      else if (form.yearsOfLife.max > 18)
        check.yearsOfLife = "La edad máxima debe ser menor a 18";
      else if (Number(form.yearsOfLife.min) > Number(form.yearsOfLife.max))
        check.yearsOfLife =
          "El valor minimo de años no puede ser mayor que el máximo en el rango";
      else check.yearsOfLife = undefined;
    }

    //Validar description
    if (form.hasOwnProperty("description")) {
      if (form.description.length < 1)
        check.description =
          "Escribe una descripción de tu perro antes de enviar!";
      else check.description = undefined;
    }

    // //Validar temperamentos

    if (selectedTemps.length < 2) {
      check.temperaments = "Debe seleccionar al menos dos temperamentos";
    } else check.temperaments = undefined;

    return check;
  };

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
  const onHeight = (v) => {
    v.target.id === "min_height"
      ? setformState((prev) => {
          return {
            ...prev,
            height: { ...prev.height, min: v.target.value },
          };
        })
      : setformState((prev) => {
          return { ...prev, height: { ...prev.height, max: v.target.value } };
        });
  };
  const onWeight = (v) => {
    console.log("Peso id", v.target.id);
    v.target.id === "min_weight"
      ? setformState((prev) => {
          return { ...prev, weight: { ...prev.weight, min: v.target.value } };
        })
      : setformState((prev) => {
          return { ...prev, weight: { ...prev.weight, max: v.target.value } };
        });
  };
  // console.log("form", formState);
  const onLive = (v) =>
    v.target.id === "min_age"
      ? setformState((prev) => {
          return {
            ...prev,
            yearsOfLife: { ...prev.yearsOfLife, min: v.target.value },
          };
        })
      : setformState((prev) => {
          return {
            ...prev,
            yearsOfLife: { ...prev.yearsOfLife, max: v.target.value },
          };
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
      height: { min: "", max: "" },
      weight: { min: "", max: "" },
      image: "",
      yearsOfLife: { min: "", max: "" },
      description: "",
    });
    setSelectedTemps([]);
  };
  const blurHandler = (e) => {
    //validar si lo que recibo algun valor que sera un objeto
    let form = { [e.target.name]: formState[e.target.name] };

    let fails = validatorFn(form);

    setErrors((prev) => {
      return { ...prev, ...fails };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let fails = validatorFn(formState);
    //seteo con los errores previos para que se vayan acumulando
    //itero fails para que concatene sus props
    setErrors((prev) => {
      return { ...prev, ...fails };
    });
    let keys = Object.values(errors).some((value) => value !== undefined);

    let combined = { ...formState, temperament: selectedTemps };
    if (!keys) {
      createDog(combined);
      resetAll();
    } else alert("Corrija los errores de los campos!");
  };

  return (
    <section>
      <NavLink to="/home">
        <h1>Home</h1>
      </NavLink>
      <h1>Crea tu propia raza</h1>
      <form onSubmit={(e) => onSubmit(e)} className={s.form}>
        {/* {" ---------------Name--------------"} */}
        <div className={s.containers}>
          <label value="Raza" className={s.raza_label}>
            <h4>Raza </h4>
            *
            <input
              required
              onChange={(e) => onName(e)}
              onBlur={(e) => blurHandler(e)}
              type="text"
              name="name"
              autoFocus
              value={formState.name}
            />
          </label>
          {errors.name && <span className={s.error}>{errors.name}</span>}
        </div>

        {/* ---------------image--------- */}
        <div className={s.containers}>
          <label htmlFor="image" className={s.image_label}>
            <h4>Imagen </h4>
            <input
              onChange={(e) => onImage(e)}
              onBlur={(e) => blurHandler(e)}
              type="text"
              name="image"
              placeholder="Url de la imagen.."
              value={formState.image}
            />
            <div className={s.img_box}>
              <img
                src={formState.image}
                alt="Su perro img"
                width="300"
                className={s.image_label_img}
              />
            </div>
          </label>
          {errors.image && <span className={s.error}>{errors.image}</span>}
        </div>

        {/* ---------------Height------------ */}
        <div className={s.containers}>
          <label htmlFor="height" className={s.height_label}>
            <h4>Altura</h4>
            <div className={s.min_max}>
              <input
                placeholder="Mínima"
                onBlur={(e) => blurHandler(e)}
                onChange={(e) => onHeight(e)}
                id="min_height"
                type="number"
                name="height"
                value={formState.height.min}
              />
              <input
                placeholder="Máxima..."
                onBlur={(e) => blurHandler(e)}
                onChange={(e) => onHeight(e)}
                type="number"
                id="max_height"
                name="height"
                value={formState.height.max}
              />
            </div>
          </label>
          {errors.height && <span className={s.error}>{errors.height}</span>}
        </div>

        {/* ---------------weight------------ */}
        <div className={s.containers}>
          <label htmlFor="weight" className={s.weight_label}>
            <h4>Peso</h4>

            <div className={s.min_max}>
              <input
                placeholder="Mínimo"
                onBlur={(e) => blurHandler(e)}
                onChange={(e) => onWeight(e)}
                type="number"
                id="min_weight"
                name="weight"
                value={formState.weight.min}
              />

              <input
                placeholder="Máximo"
                onBlur={(e) => blurHandler(e)}
                onChange={(e) => onWeight(e)}
                type="number"
                id="max_weight"
                name="weight"
                value={formState.weight.max}
              />
            </div>
          </label>
          {errors.weight && <span className={s.error}>{errors.weight}</span>}
        </div>

        {/* ---------------Live-------------- */}
        <div className={s.containers}>
          <label htmlFor="live" className={s.live_label}>
            <h4>Promedio de vida</h4>
            <div className={s.min_max}>
              <input
                placeholder="Mínimo"
                onBlur={(e) => blurHandler(e)}
                onChange={(e) => onLive(e)}
                type="number"
                id="min_age"
                name="yearsOfLife"
                value={formState.yearsOfLife.min}
              />

              <input
                placeholder="Máximo"
                onBlur={(e) => blurHandler(e)}
                onChange={(e) => onLive(e)}
                type="number"
                id="max_age"
                name="yearsOfLife"
                value={formState.yearsOfLife.max}
              />
            </div>
          </label>
          {errors.yearsOfLife && (
            <span className={s.error}>{errors.yearsOfLife}</span>
          )}
        </div>

        {/*  ---------------temeperament---------*/}
        <div className={s.temperament_box}>
          <h4>Temperamento</h4>
          <select
            onChange={(e) => onTemperament(e)}
            onBlur={(e) => blurHandler(e)}
          >
            {temperament.length ? (
              temperament.map((temp, idx) => (
                <option key={temp} value={temp}>
                  {temp}
                </option>
              ))
            ) : (
              <option>Cargando...</option>
            )}
          </select>
          {errors.temperaments && (
            <span className={s.error}>{errors.temperaments}</span>
          )}
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
        </div>

        {/* ---------------description--------- */}
        <div className={s.containers}>
          <label htmlFor="description" className={s.description_label}>
            Descripcion
            <textarea
              onBlur={(e) => blurHandler(e)}
              onChange={(e) => onDescription(e)}
              cols="20"
              rows="10"
              name="description"
              value={formState.description}
            />
          </label>
          {errors.description && (
            <span className={s.error}>{errors.description}</span>
          )}
        </div>

        {/* -----------submit---------- */}
        <div className={s.submit_box}>
          <input type="submit" />
          <input type="reset" />
        </div>
      </form>
      ;
    </section>
  );
}
