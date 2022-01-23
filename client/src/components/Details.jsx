import React from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./css/details.module.css";
import { useNavigate, useParams } from "react-router";
import Modal from "./Modal";
import arrow from "../images/arrow.png";
import optionIcon from "../images/options-icon.png";
import Edit from "./Edit/Edit";
import { deleteDog } from "../redux/actions";
import Footer from "./Footer";

export default function Details() {
  const dispatcher = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  let { dogId } = useParams();
  const [pop, setPop] = React.useState(false);
  const [anim, setAnim] = React.useState(false);
  const open = () => {
    setPop(!pop);
  };
  const [option, setOption] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
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
  const showOptions = () => {
    setOption((prev) => !prev);
  };
  //setea el estado para mostrar el form update
  const showUpdate = () => {
    setUpdate(true);
  };
  const removeDog = () => {
    if (window.confirm("Si confirma, su perro se eliminará")) {
      deleteDog(dogId, dispatcher);
      navigate("/home");
      window.location.reload(true);
    }
  };
  return (
    <React.Fragment>
      <div className={`${s.main_box} ${anim && s.opacity}`}>
        <div className={s.arrow}>
          <img onClick={back} src={arrow} alt="arrow.img" />
        </div>

        {update && (
          <Edit
            id={dogId}
            thisDog={thisDog}
            temps={temperament}
            setUpdate={setUpdate}
            setOption={setOption}
          />
        )}
        <Modal
          pop={pop}
          setPop={setPop}
          img={thisDog && (thisDog.image.url || thisDog.image)}
        />

        <div className={s.details_box}>
          {/* ----------options box----------- */}
          {thisDog && thisDog.database ? (
            <div className={s.options}>
              <img onClick={showOptions} src={optionIcon} alt="option-icon" />
            </div>
          ) : null}
          {/* options div */}
          {thisDog && thisDog.database
            ? option && (
                <div className={s.options_div}>
                  <ul>
                    <li onClick={showUpdate}>Actualizar</li>
                    <li onClick={removeDog}>Eliminar</li>
                  </ul>
                </div>
              )
            : null}

          {/* -----------features box----------- */}
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
      <Footer />
    </React.Fragment>
  );
}
