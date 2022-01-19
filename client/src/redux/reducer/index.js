import {
  GET_ALL_DOGS,
  GET_TEMPERAMENT,
  GET_SEARCHED_DOGS,
  FILTER_BY_TEMPERAMENT,
  ASCENDENT,
  DESCENDENT,
  GET_CREATED,
  GET_ONLY_API,
  CREATE_DOG,
  GET_ALL,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
} from "../actions";
import {} from "../actions";
import { orderNameFn, orderWeightFn } from "./controllers";

const initialState = {
  dogs: [],
  temperaments: [],
  searched: [],
  filtered: [],
  filteredByTemps: [],
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      // console.log("se ejecuto getAlldogs en reducer");
      //devuelvo los dogs ordenados por nombre por default
      return {
        ...state,
        dogs: action.payload,
        filtered: action.payload.sort((a, b) =>
          a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
        ),
      };
    case GET_CREATED:
      let created = state.dogs.filter((dog) => (dog.database ? true : false));
      // console.log("se ejecuto reducer created");
      // console.log("nuevo filtered", created);
      return {
        ...state,
        filtered: created,
      };
    case GET_ALL:
      //refiere al select 'Todos'
      return {
        ...state,
        filtered: state.dogs,
      };

    case GET_ONLY_API:
      let fromApi = state.dogs.filter((dog) => !dog.database);
      // console.log("se ejecuto reducer GET_API");

      return {
        ...state,
        filtered: fromApi,
      };
    case GET_TEMPERAMENT:
      return {
        ...state,
        temperaments: action.payload,
      };
    case GET_SEARCHED_DOGS:
      return {
        ...state,
        filtered: action.payload,
      };
    case ORDER_BY_NAME:
      return {
        ...state,
        filtered: orderNameFn(state.filtered),
      };
    case ORDER_BY_WEIGHT:
      return {
        ...state,
        filtered: orderWeightFn(state.filtered),
      };
    case FILTER_BY_TEMPERAMENT:
      //destructuring de ambos valores del action.payload
      const { conditionals, selected } = action.payload;
      //en una variable le asigno en principio, a partir del el valor de orderBy
      let dogsWithConditional =
        conditionals === "" || conditionals === "all"
          ? state.dogs
          : conditionals === "api"
          ? state.dogs.filter((dog) => !dog.database)
          : state.dogs.filter((dog) => (dog.database ? true : false));
      // console.log("dogsWidthconditional tamano", dogsWithConditional.length);
      //filtrado de todos los dogs
      const filter = dogsWithConditional.filter((dog) => {
        //dogs.temperament--> string
        //cada elemento del payload debe existir en las temps del dog. Es un concicional &&

        //guardo los temperamentos del perro actual analizado (dog) en una variable, dependiendo si es Db o de la api
        //los temperamentos del dog actual me van a servir para validar si coinciden con los selected

        //temperamentos de la DB, vienen en [...]
        let createdTemps = dog.database
          ? dog.temperaments.map((t) => t.name.toUpperCase().trim())
          : undefined;

        //temperamentos de la api vienen en string
        let apiTemps =
          dog.temperament &&
          dog.temperament.split(",").map((e) => e.toUpperCase().trim());

        //vaiable que incluye alguna de las anteriores para validar
        let toAnalyze = dog.database ? createdTemps : apiTemps;

        //filter &&
        if (toAnalyze) {
          //si Todos los elementos pasan el boolean, devuelve true
          //evaluo si cada temperamento seleccionado existe dentro de los temperamentos del perro actual
          //si alguno no existe, no me devolverá el perro actual
          // selected -> [a, b, c]--> toAnalyze.include(a)?.. toAnalyze.include(v)?.. toAnalyze.include(c)?
          let validator = selected.every((tempUser) =>
            toAnalyze.includes(tempUser)
          );

          return validator;
        } else {
          // console.log("este perro:", dog.name, "no tiene temperamentos", dog);
          return false;
        }
      });

      return {
        ...state,
        filtered: filter
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((e) => e),
      };

    case ASCENDENT:
      if (action.payload === "peso") {
        return {
          ...state,
          filtered: orderWeightFn(state.filtered),
        };
      } else
        return {
          ...state,
          filtered: orderNameFn(state.filtered),
        };

    case DESCENDENT:
      if (action.payload === "peso") {
        return {
          ...state,
          filtered: orderWeightFn(state.filtered).reverse(),
        };
      } else {
        return {
          ...state,
          filtered: orderNameFn(state.filtered).reverse(),
        };
      }
    case CREATE_DOG:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
}
