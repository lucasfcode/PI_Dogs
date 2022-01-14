import axios from "axios";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const GET_SEARCHED_DOGS = "GET_SEARCHED_DOGS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const ASCENDENT = "ASCENDENT";
export const DESCENDENT = "DESCENDENT";
export const GET_CREATED = "GET_CREATED";
export const GET_ONLY_API = "GET_ONLY_API";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const CREATE_DOG = "CREATE_DOG";

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
        console.log(json);
        dispatch({
          type: GET_SEARCHED_DOGS,
          payload: json,
        });
      })
      .catch((err) => console.log("hubo un error en buscar dog", err));
  };
};

export const filterByTemp = (value) => {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload: value,
  };
};

// export const orderByName = (value) => {
//   return {
//     type: ORDER_BY_NAME,
//     payload: value,
//   };
// };
// export const orderByWeight = (value) => {
//   return {
//     type: ORDER_BY_WEIGHT,
//     payload: value,
//   };
// };

export const ascOrder = (value) => {
  console.log("Se ejecuto ascOrder con el valor ", value);
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
export const createDog = (object) => {
  let setBody = {
    ...object,
    height: `${object.height.min} - ${object.height.max}`,
    weight: `${object.weight.min} - ${object.weight.max}`,
    yearsOfLife: `${object.yearsOfLife.min} - ${object.yearsOfLife.max}`,
  };
  // console.log("setBody", setBody);
  axios
    .post("http://localhost:3001/dogs", setBody)
    .then((res) => res.data)
    .then((data) => console.log("creado", data))
    .catch((err) => console.log("error en axios", err));
};
