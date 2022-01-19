import React from "react";
import { useSelector } from "react-redux";
import s from "./css/details.module.css";
import { useNavigate, useParams } from "react-router";
import Modal from "./Modal";
import arrow from "../images/arrow.png";

export default function Details() {
  const dogs = useSelector((state) => state.dogs);
  let { dogId } = useParams();
  const [pop, setPop] = React.useState(false);
  const [anim, setAnim] = React.useState(false);
  const open = () => {
    setPop(!pop);
  };
  // transition effect
  React.useEffect(() => {
    let timeO = setTimeout(() => {
      setAnim((anim) => !anim);
      timeO = null;
    }, 10);

    return () => {
      clearTimeout(timeO);
    };
  }, []);

  let navigate = useNavigate();

  let thisDog = dogs.find((d) => d.id.toString() === dogId.toString());

  let height =
    thisDog && (thisDog.database ? thisDog.height : thisDog.height.metric);

  let temperament =
    thisDog &&
    (thisDog.database
      ? thisDog.temperaments.map((e) => e.name).join(", ")
      : thisDog.temperament);
  let weight =
    thisDog && (thisDog.database ? thisDog.weight : thisDog.weight.metric);
  const back = () => navigate(-1);

  return (
    <div className={`${s.main_box} ${anim && s.opacity}`}>
      <div onClick={back} className={s.arrow}>
        <img src={arrow} alt="arrow.img" />
      </div>
      <Modal
        pop={pop}
        setPop={setPop}
        img={thisDog && (thisDog.image.url || thisDog.image)}
      />

      <div className={s.details_box}>
        <div className={s.features_box}>
          <img
            onClick={open}
            src={thisDog && (thisDog.image.url || thisDog.image)}
            alt="dog_img"
          />

          <h1 translate="no" className={s.name}>
            {thisDog && thisDog.name}
          </h1>

          <p className={s.description_p}>{thisDog && thisDog.description}</p>
          {/* -----Características----- */}
          <h2>Características</h2>
          <div>
            <h4>Temperamento</h4>
            <p>{temperament}</p>
          </div>
          <div>
            <h4>Altura</h4>
            <p>{height} cm</p>
          </div>
          <div>
            <h4>Peso</h4>
            <p>{weight} Kilos</p>
          </div>
          <div>
            <h4>Promedio de vida</h4>
            <p>{thisDog && (thisDog.life_span || thisDog.yearsOfLife)} </p>
          </div>
          <div>
            <h4>Criado para</h4>
            <p>{thisDog && (thisDog.database ? "- " : thisDog.bred_for)}</p>
          </div>

          <div>
            <h4>Pertenece al grupo de razas</h4>
            <p translate="yes">
              {thisDog && (thisDog.database ? " - " : thisDog.breed_group)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
