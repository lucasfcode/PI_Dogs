export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const GET_SEARCHED_DOGS = "GET_SEARCHED_DOGS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const ASCENDENT = "ASCENDENT";
export const DESCENDENT = "DESCENDENT";
export const GET_CREATED = "GET_CREATED";
export const GET_ONLY_API = "GET_ONLY_API";

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
  return fetch(`http://localhost:3001/temperament`)
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

export const filterByTemp = (value) => {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload: value,
  };
};
export const ascOrder = (value) => {
  return {
    type: ASCENDENT,
    payload: value,
  };
};
export const descOrder = (value) => {
  return {
    type: DESCENDENT,
    payload: value,
  };
};

export const getCreated = () => {
  return {
    type: GET_CREATED,
    payload: "",
  };
};
export const getOnlyApi = () => {
  return {
    type: GET_ONLY_API,
    payload: "",
  };
};
