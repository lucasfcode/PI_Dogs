import Search from "./Search";
import React from "react";
import sHome from "./css/home.module.css";
import dogStyle from "./css/dog.module.css";
import Pages from "./Pages";
import { useDispatch, useSelector } from "react-redux";
import Dog from "./Dog";
import NotFound from "./NotFound";
import { getAllDogs } from "../redux/actions";
import { Filters } from "./Filters";

export default function Home() {
  const reduxState = useSelector((state) => state);
  const [currentPage, setCurrentPage] = React.useState(1);
  const dispatch = useDispatch();
  React.useEffect(() => {
    getAllDogs(dispatch);
    return () => {
      console.log("Home desmontado");
    };
  }, []);

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
        <div className={dogStyle.dogs_container}>
          {currentRender.length ? (
            currentRender.map((e) => {
              return <Dog aDog={e} key={e.id} id={e.id} />;
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
