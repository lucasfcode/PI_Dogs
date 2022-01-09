import React, { useEffect } from "react";
import s from "./css/notfound.module.css";
export default function NotFound() {
  const [wait, setWait] = React.useState(false);
  useEffect(() => {
    setTimeout(() => setWait(true), 3000);
  }, []);

  return (
    <div className={s.main_box}>
      {wait ? (
        <h1>No se ha encontrado ninguna coincidencia con tales filtros</h1>
      ) : (
        <div className={s.loader}></div>
      )}
    </div>
  );
}
