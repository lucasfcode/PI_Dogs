import React from "react";

import s from "./css/home.module.css";

export default function Pages({
  allDogs,
  setCurrentPage,
  render,
  currentPage,
  setTransContainer,
}) {
  //la cantidad de paginas que voy a tener va a depender de cuantos objetos quiero mostrar por pagina
  //en este casi quiero renderizar 8.. por lo que necesito saber la cantidad de elementos que tiene el array
  //y luego dividir la totalidad por la cantidad que quiero renderizar
  //el slice me muestra del indice 0 (index+1 = 1) hasta el resultado de la division (22)
  const pageNumbers = allDogs
    .map((e, index) => index + 1)
    .slice(0, Math.ceil(allDogs.length / render));

  const containerOpacity = () => {
    setTimeout(() => {
      setTransContainer((prev) => true);
    }, 100);
  };

  //controlador de página actual activa. Depende del numero donde haga click
  const activeHandler = (number) => {
    //si transC false-> opacity 0
    setTransContainer(false);
    //seteo en true transC
    containerOpacity();
    setCurrentPage(number);

    window.scrollTo(0, 0);
  };

  return (
    <div className={s.pages}>
      <ul>
        {pageNumbers.length &&
          pageNumbers.map((number, i) => (
            <li
              key={i}
              onClick={() => activeHandler(number)}
              className={currentPage === number ? s.active : ""}
            >
              {number}
            </li>
          ))}
      </ul>
    </div>
  );
}
