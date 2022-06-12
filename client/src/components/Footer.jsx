import React from "react";
import style from "./css/footer.module.css";
export default function Footer() {
  return (
    <div className={style.main}>
      <div className={style.contact}>
        <small>&copy; Autoría de Lucas Ferreira 2022</small>
        <br />

        <a href="mailto: lucasferreiraok@outlook.com">Envíame un email</a>
        <a href="https://www.linkedin.com/in/lucasdevferreira/" target="blank">
          Linkedin
        </a>
      </div>
    </div>
  );
}
