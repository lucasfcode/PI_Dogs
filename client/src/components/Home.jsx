import Search from "./Search";
import React from "react";
import sHome from "./css/home.module.css";
import sSearch from "./css/search.module.css";
import Pages from "./Pages";
import { useSelector } from "react-redux";
import Dog from "./Dog";
import NotFound from "./NotFound";
import { Filters } from "./Filters";

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
      <Search />
      <Filters />

      {
        <div className={sSearch.show}>
          {currentRender.length ? (
            currentRender.map((e) => {
              return <Dog aDog={e} key={e.id} />;
            })
          ) : (
            <NotFound />
          )}
        </div>
      }
      <Pages
        setCurrentPage={setCurrentPage}
        allDogs={reduxState.filtered}
        render={render}
        currentPage={currentPage}
      />
    </div>
  );
}
