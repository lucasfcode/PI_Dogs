import React from "react";
import s from "./css/dog.module.css";
export default function Dog(props) {
  return (
    <div className={s.dog}>
      <img src={props.stateRedux.image.url} alt="Img_dog" />
      <h2>{props.founded.name}</h2>
      <br />
      <h3>Temperamento</h3>
      <p>{props.founded.temperament}</p>
      <h3>Peso</h3>
      <span>{props.founded.weight.metric}</span>
    </div>
  );
}
