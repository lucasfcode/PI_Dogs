import React from "react";
import { Link } from "react-router-dom";
import cssDog from "./css/dog.module.css";

export default function Dog(props) {
  // declaro temperament porque los dogs creados me devuelven un array
  let temperament = props.aDog.temperaments
    ? props.aDog.temperaments.map((e) => e.name).join(",")
    : props.aDog.temperament;

  return (
    <div className={`${cssDog.dog}  ${props.transContainer && cssDog.opacity}`}>
      <div className={cssDog.name}>
        <Link
          to={`/home/details/${props.aDog.id}`}
          onClick={() => window.scrollTo(0, 0)}
          className={cssDog.link}
        >
          <h2>{props.aDog.name}</h2>
        </Link>
      </div>
      <div className={`${cssDog.img_container}`}>
        <img
          src={props.aDog.image.url || props.aDog.image}
          alt="Img_dog"
          className={cssDog.img_card}
        />
      </div>

      <div className={cssDog.info}>
        <div className={cssDog.temperament_box}>
          <h3>Temperamento</h3>
          <ul>
            {temperament &&
              temperament.split(",").map((e, i) => <li key={i}>{e.trim()}</li>)}
          </ul>
        </div>
        <div className={cssDog.weight_box}>
          <h3>Peso</h3>
          <span>
            {props.aDog.database ? props.aDog.weight : props.aDog.weight.metric}{" "}
            Kg
          </span>
        </div>
      </div>
    </div>
  );
}
