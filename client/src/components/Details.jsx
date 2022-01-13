import React from "react";
import { useSelector } from "react-redux";
import s from "./css/details.module.css";
import { useParams } from "react-router";

export default function Details() {
  const dogs = useSelector((state) => state.dogs);
  let { dogId } = useParams();

  let thisDog = dogs.find((d) => d.id.toString() === dogId.toString());
  console.log("thisDog", thisDog);

  return (
    <div className={s.details_box}>
      <div>
        <img
          src={thisDog && (thisDog.image.url || thisDog.image)}
          alt="dog_img"
        />
        <h1>{thisDog && thisDog.name}</h1>
      </div>
      <hr />
      <div>
        <p>{thisDog && thisDog.description}</p>
        <h2>Características</h2>
        <p>Temperamento: {thisDog && thisDog.temperament}</p>
        <p>Altura : {thisDog && thisDog.height.metric}</p>
        <p>Peso : {thisDog && thisDog.weight.metric}</p>
        <p>
          Promedio de vida:{" "}
          {thisDog && (thisDog.life_span || thisDog.yearsOfLife)}{" "}
        </p>
      </div>
    </div>
  );
}
