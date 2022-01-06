export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const GET_SEARCHED_DOGS = "GET_SEARCHED_DOGS";

export const getAllDogs = (dispatch) => {
  return fetch(`http://localhost:3001/dogs`)
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: GET_ALL_DOGS,
        payload: json,
      });
    })
    .catch((err) => console.log("Error en getAllDogs", err));
};

export const getTemperaments = (dispatch) => {
  return fetch(`http://localhost:3000/temperament`)
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: GET_TEMPERAMENT,
        payload: json,
      });
    });
};

export const getSearchedDogs = (toSearch) => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/dogs/?name=${toSearch}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_SEARCHED_DOGS,
          payload: json,
        });
      });
  };
};
