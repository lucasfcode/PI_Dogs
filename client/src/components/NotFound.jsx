import React from "react";
import s from "./css/notfound.module.css";
import ErrorPage from "./Error";
export default function NotFound({ currentRender }) {
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    let timeO = setTimeout(() => {
      setError((error) => !error);
      timeO = null;
    }, 3000);

    return () => {
      // console.log("usseEffect de notFound desmontado");
      clearTimeout(timeO);
    };
  }, []);
  return (
    <div className={s.main_box}>
      {!error ? <div className={s.loader}></div> : <ErrorPage />}
    </div>
  );
}
