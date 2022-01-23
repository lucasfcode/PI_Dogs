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
export const GET_ALL = " GET_ALL";
export const UPDATE_DOG = "UPDATE_DOG";
export const DELETE_DOG = "DELETE_DOG";

export const getAllDogs = (dispatch) => {
  return axios(`/dogs`)
    .then((response) => response.data)
    .then((json) => {
      console.log("axios valor from all dogs", axios.defaults.baseURL);
      dispatch({
        type: GET_ALL_DOGS,
        payload: json,
      });
    })
    .catch((err) => console.log("Error en getAllDogs", err));
};

export const getTemperaments = (dispatch) => {
  return axios(`/temperament`)
    .then((response) => response.data)
    .then((json) => {
      dispatch({
        type: GET_TEMPERAMENT,
        payload: json,
      });
    });
};

export const getSearchedDogs = (toSearch) => {
  return function (dispatch) {
    return axios(`/dogs/?name=${toSearch}`)
      .then((response) => response.data)
      .then((json) => {
        // console.log(json);
        dispatch({
          type: GET_SEARCHED_DOGS,
          payload: json,
        });
      })
      .catch((err) => console.log("hubo un error en buscar dog", err));
  };
};

export const filterByTemp = (conditionals, selected) => {
  //value ya está en mayúscula
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload: { conditionals, selected },
  };
};
export const orderByName = (value) => {
  // console.log("se dispacho by Order");
  //es indistinto que tenga value
  return {
    type: ORDER_BY_NAME,
    payload: value,
  };
};
export const orderByWeight = (value) => {
  // console.log("se dispacho orderByWeight", value);
  //es indistinto que tenga value
  return {
    type: ORDER_BY_WEIGHT,
    payload: value,
  };
};
export const ascOrder = (value) => {
  // console.log("Se ejecuto ascOrder con el valor ", value);
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
//select refiere a que se un tag select--> opcion 'Todos' del select
export const getAllSelect = () => {
  return {
    type: GET_ALL,
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
    .post("/dogs", setBody)
    .then((res) => res.data)
    .then((data) => console.log("creado", data))
    .catch((err) => console.log("error en axios", err));
};

export const updateDog = (form, id) => {
  let updated = {
    ...form,
    height: `${form.height.min} - ${form.height.max}`,
    weight: `${form.weight.min} - ${form.weight.max}`,
    yearsOfLife: `${form.yearsOfLife.min} - ${form.yearsOfLife.max}`,
  };
  axios
    .put(`/dogs/${id}`, updated)
    .then((res) => res.data)
    .then((res) => console.log("updated", res))
    .catch((e) => console.log("error en updated", e));

  return {
    type: UPDATE_DOG,
  };
};
export const deleteDog = (id, dispatch) => {
  ///j
  axios
    .delete(`/dogs/clear/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: DELETE_DOG,
      });
    })
    .catch((error) => console.log("error en delete", error));
};
