import React from "react";
import style from "./css/footer.module.css";
export default function Footer() {
  return (
    <div className={style.main}>
      <div className={style.contact}>
        <small>
          &copy; Autoría de Lucas Ferreira, estudiante en Henry 2022
        </small>
        <br />

        <a href="mailto: lucasferreiraok@outlook.com">Envíame un email</a>
      </div>
    </div>
  );
}
