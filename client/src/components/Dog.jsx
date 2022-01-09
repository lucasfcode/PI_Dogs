import React from "react";
import s from "./css/dog.module.css";
export default function Dog(props) {
  return (
    <div className={s.dog}>
      <img src={props.aDog.image.url || props.aDog.image} alt="Img_dog" />
      <h2>{props.aDog.name}</h2>
      <br />
      <h3>Temperamento</h3>
      <p>{props.aDog.temperament}</p>
      <h3>Peso</h3>
      <span>{props.aDog.weight.metric || props.aDog.weight}</span>
    </div>
  );
}
