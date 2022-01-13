import React from "react";
import { Link } from "react-router-dom";
import s from "./css/dog.module.css";
export default function Dog(props) {
  // declaro temperament porque los dogs creados me devuelven un array
  let temperament = props.aDog.temperaments
    ? props.aDog.temperaments.map((e) => e.name).join(", ")
    : props.aDog.temperament;

  return (
    <div className={s.dog}>
      <div className={s.img_container}>
        <img
          src={props.aDog.image.url || props.aDog.image}
          alt="Img_dog"
          className={s.img_card}
        />
      </div>
      <div className={s.name}>
        <Link to={`/home/details/${props.aDog.id}`} className={s.link}>
          <h2>{props.aDog.name}</h2>
        </Link>
      </div>

      <div className={s.info}>
        <div className={s.temperament_box}>
          <h3>Temperamento</h3>
          <ul>
            {temperament &&
              temperament.split(",").map((e, i) => <li key={i}>{e.trim()}</li>)}
          </ul>
        </div>
        <div className={s.weight_box}>
          <h3>Peso</h3>
          <span>{props.aDog.weight.metric || props.aDog.weight} Kg</span>
        </div>
      </div>
    </div>
  );
}
