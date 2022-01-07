import React from "react";
import s from "./css/dog.module.css";
export default function Dog(props) {
  return (
    <div className={s.dog}>
      <img src={props.stateRedux.image.url} alt="Img_dog" />
      <h2>{props.stateRedux.name}</h2>
      <br />
      <h3>Temperamento</h3>
      <p>{props.stateRedux.temperament}</p>
      <h3>Peso</h3>
      <span>{props.stateRedux.weight.metric}</span>
    </div>
  );
}
