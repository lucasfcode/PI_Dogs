import Search from "./Search";
import React from "react";
import sHome from "./css/home.module.css";
import sSearch from "./css/search.module.css";
import Pages from "./Pages";
import { useSelector } from "react-redux";
import Dog from "./Dog";

export default function Home() {
  const reduxState = useSelector((state) => state);
  const [currentPage, setCurrentPage] = React.useState(1);
  const render = 8;
  const lastPageIndex = currentPage * render;
  const firstPageIndex = lastPageIndex - render;
  const currentRender = reduxState.dogs.slice(firstPageIndex, lastPageIndex);

  return (
    <div className={sHome.home}>
      <Search />
      <Pages
        setCurrentPage={setCurrentPage}
        allDogs={reduxState.dogs}
        render={render}
        currentPage={currentPage}
      />
      {
        <div className={sSearch.show}>
          {currentRender.length &&
            currentRender.map((e) => {
              return <Dog stateRedux={e} key={e.id} />;
            })}
        </div>
      }
    </div>
  );
}
