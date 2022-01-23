// import Search from "./Search";
import React from "react";
import sHome from "./css/home.module.css";
import dogStyle from "./css/dog.module.css";
import Pages from "./Pages";
import { useSelector } from "react-redux";
import Dog from "./Dog";
import NotFound from "./NotFound";
// import { getAllDogs } from "../redux/actions";
import { Filters } from "./Filters";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Home() {
  const reduxState = useSelector((state) => state);
  //en principio el current será 1
  const [currentPage, setCurrentPage] = React.useState(1);

  const render = 8;
  //necesito  mostrar siempre 8 elementos del arreglo. Pero esto deve ir cambiando segun los indices que le indicaré a través de un slice.

  //siempre se hará esta multiplicacion para saber cual será el ultimo indice a mostrar
  const lastPageIndex = currentPage * render;
  //se restará la cantidad de objetos a renderizar para saber cuál es el primer indice a mostrar
  const firstPageIndex = lastPageIndex - render;
  //Los 8 objetos a renderizar van a ser resultado de un slice de la totalidad de objetos
  //devolverá un array con los indices definidos desde el primero y el ultimo, dependiendo de en qué pagina me encuentro (valor de currentPage)
  const currentRender = reduxState.filtered.slice(
    firstPageIndex,
    lastPageIndex
  );
  const [anim, setAnim] = React.useState(false);
  const transFunction = () => {
    let timeO = setTimeout(() => {
      setAnim((anim) => true);
      timeO = null;
    }, 10);

    return () => {
      clearTimeout(timeO);
    };
  };
  //estado de transicion de dogs-container
  const [transContainer, setTransContainer] = React.useState(true);

  React.useEffect(() => {
    transFunction();
    // setTransContainer(true);
  }, []);

  return (
    <React.Fragment>
      <Nav setCurrentPage={setCurrentPage} />
      <div className={` ${anim && sHome.opacity} ${sHome.home} `}>
        <Pages
          setTransContainer={setTransContainer}
          setCurrentPage={setCurrentPage}
          allDogs={reduxState.filtered}
          render={render}
          currentPage={currentPage}
        />
        {
          <div className={`${dogStyle.dogs_container}`}>
            {currentRender.length ? (
              currentRender.map((e) => {
                return (
                  <Dog
                    aDog={e}
                    key={e.id}
                    id={e.id}
                    transContainer={transContainer}
                  />
                );
              })
            ) : (
              <NotFound currentRender={currentRender} />
            )}
          </div>
        }
        <Filters setCurrentPage={setCurrentPage} />
        <Pages
          setTransContainer={setTransContainer}
          setCurrentPage={setCurrentPage}
          allDogs={reduxState.filtered}
          render={render}
          currentPage={currentPage}
        />
      </div>
      <Footer />
    </React.Fragment>
  );
}
