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
} from "../actions";
import {} from "../actions";

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
      console.log("se ejecuto getAlldogs");
      return {
        ...state,
        dogs: action.payload,
        filtered: action.payload,
      };
    case GET_CREATED:
      let created = state.dogs.filter((dog) => (dog.database ? true : false));
      console.log("se ejecuto reducer created");
      console.log("nuevo filtered", created);
      return {
        ...state,
        filtered: created,
      };
    case GET_ALL:
      return {
        ...state,
        filtered: state.dogs,
      };

    case GET_ONLY_API:
      let fromApi = state.dogs.filter((dog) => !dog.database);
      console.log("se ejecuto reducer GET_API");

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
    case FILTER_BY_TEMPERAMENT:
      console.log("por filtrar---->", state.filtered.length);
      console.log("action payload", action.payload);
      const filter = state.filtered.filter((dog) => {
        //dogs.temperament--> string
        //action.payload--> array
        //cada elemento del payload debe existir en las temps del dog. Es un concicional &&

        //temperamentos de los creados, vienen en [...]
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
          let validator = action.payload.every((tempUser) =>
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
      //doble sort porque primero se ordena en funcion al valor minimo  y luego al minimo y maximo del peso. Si no devuelvo un map, no recibo el arreglo ordenado. Trabaja sobre los dogs de filtered

      let orderWeight = state.filtered
        .sort((a, b) => {
          let pesoA = a.database ? a.weight : a.weight.metric;
          let pesoB = b.database ? b.weight : b.weight.metric;
          return Number(pesoA.split("-")[0]) - Number(pesoB.split("-")[0]);
        })
        .sort((a, b) => {
          let pesoA = a.database ? a.weight : a.weight.metric;
          let pesoB = b.database ? b.weight : b.weight.metric;
          return Number(pesoA.split("-")[1]) - Number(pesoB.split("-")[1]);
        })
        .map((e) => e);

      let orderName = state.filtered.sort((a, b) => (a.name > b.name ? 1 : -1));

      if (action.payload === "peso") {
        return {
          ...state,
          filtered: orderWeight,
        };
      } else
        return {
          ...state,
          filtered: orderName,
        };

    case DESCENDENT:
      if (action.payload === "peso") {
        let orderWeight = state.filtered
          .sort((a, b) => {
            let pesoA = a.database ? a.weight : a.weight.metric;
            let pesoB = b.database ? b.weight : b.weight.metric;
            return Number(pesoA.split("-")[0]) - Number(pesoB.split("-")[0]);
          })
          .sort((a, b) => {
            let pesoA = a.database ? a.weight : a.weight.metric;
            let pesoB = b.database ? b.weight : b.weight.metric;
            return Number(pesoA.split("-")[1]) - Number(pesoB.split("-")[1]);
          })
          .map((e) => e);
        return {
          ...state,
          filtered: orderWeight.reverse(),
        };
      } else {
        return {
          ...state,
          filtered: state.filtered.reverse(),
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
