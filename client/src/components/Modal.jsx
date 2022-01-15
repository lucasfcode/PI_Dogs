import React from "react";
import css from "./css/modal.module.css";
export default function Modal({ img, pop, setPop }) {
  const close = () => setPop(!pop);
  return (
    <div className={pop ? css.main : css.display}>
      <div>
        <img src={img} alt="img" />
        <button className={css.close} onClick={close}>
          X
        </button>
      </div>
    </div>
  );
}
