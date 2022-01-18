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

export default function Home() {
  const reduxState = useSelector((state) => state);
  const [currentPage, setCurrentPage] = React.useState(1);

  const render = 8;
  const lastPageIndex = currentPage * render;
  const firstPageIndex = lastPageIndex - render;
  const currentRender = reduxState.filtered.slice(
    firstPageIndex,
    lastPageIndex
  );

  return (
    <div className={sHome.home}>
      <Nav setCurrentPage={setCurrentPage} />

      <Pages
        setCurrentPage={setCurrentPage}
        allDogs={reduxState.filtered}
        render={render}
        currentPage={currentPage}
      />
      {
        <div className={`${dogStyle.dogs_container} `}>
          {currentRender.length ? (
            currentRender.map((e) => {
              return <Dog aDog={e} key={e.id} id={e.id} />;
            })
          ) : (
            <NotFound />
          )}
        </div>
      }
      <Filters setCurrentPage={setCurrentPage} />
      <Pages
        setCurrentPage={setCurrentPage}
        allDogs={reduxState.filtered}
        render={render}
        currentPage={currentPage}
      />
    </div>
  );
}
