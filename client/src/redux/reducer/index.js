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
} from "../actions";
import {} from "../actions";

const initialState = {
  dogs: [],
  temperaments: [],
  searched: [],
  filtered: [],
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        filtered: action.payload,
      };
    case GET_CREATED:
      let created = state.dogs.filter((dog) => dog.database);

      return {
        ...state,
        filtered: created,
      };
    case GET_ONLY_API:
      let fromApi = state.dogs.filter((dog) => !dog.database);
      console.log("se ejecuto reducer GET_API");

      return {
        ...state,
        filtered: fromApi,
      };
    case GET_TEMPERAMENT:
      console.log("GetTemperaments ejecutado");
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
      const filter = state.dogs.filter((dog) => {
        //dogs.temperament--> string
        //action.payload--> array
        //cada elemento del payload debe existir en las temps del dog. Es un concicional &&
        //tempr to array
        let tempToArr =
          dog.temperament &&
          dog.temperament.split(",").map((e) => e.toUpperCase().trim());
        //filter &&
        if (tempToArr) {
          let mapsOfTrue = action.payload.every((temperament) =>
            tempToArr.includes(temperament)
          );
          // mapsOfTrue &&
          //   console.log(
          //     mapsOfTrue,
          //     dog.name,
          //     "posee: ",
          //     tempToArr,
          //     "y los filtros son: ",
          //     action.payload
          //   );
          return mapsOfTrue;
        } else {
          console.log(dog.name, "no tiene temperamentos", dog.temperament);
          return false;
        }

        //filtros OR
        // if (tempToArr) {
        //   let mapsOfTrue = tempToArr.some((temperament) =>
        //     //este temp incluye en los temp marcados por el user?
        //     action.payload.includes(temperament)
        //   );
        //   console.log("mapofTrue", mapsOfTrue);
        //   return mapsOfTrue;
        // } else {
        //   console.log(dog.name, "no tiene temperamentos", dog.temperament);
        //   return false;
        // }
      });
      return {
        ...state,
        filtered: filter
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((e) => e),
      };
    // case ORDER_BY_NAME:
    //   let orderName = state.filtered.sort((a, b) => (a.name > b.name ? 1 : -1));
    //   return {
    //     ...state,
    //     filtered: orderName,
    //   };
    // case ORDER_BY_WEIGHT:
    //   let orderWeight = state.dogs.sort(
    //     (a, b) =>
    //       Number(a.weight.metric.split("-")[0]) -
    //       Number(b.weight.metric.split("-")[0])
    //   );
    //   return {
    //     ...state,
    //     filtered: orderWeight,
    //   };
    case ASCENDENT:
      //doble sort porque primero se ordena en funcion al valor minimo [12] y luego al minimo y maximo [..- 34]. Si no devuelvo un map, no recibo el arreglo ordenado

      let orderWeight = state.filtered
        .sort((a, b) => {
          let pesoA = a.weight.metric;
          let pesoB = b.weight.metric;
          return Number(pesoA.split("-")[0]) - Number(pesoB.split("-")[0]);
        })
        .sort(
          (a, b) =>
            Number(a.weight.metric.split("-")[1]) -
            Number(b.weight.metric.split("-")[1])
        )
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
          .sort(
            (a, b) =>
              Number(a.weight.metric.split("-")[0]) -
              Number(b.weight.metric.split("-")[0])
          )
          .sort(
            (a, b) =>
              Number(a.weight.metric.split("-")[1]) -
              Number(b.weight.metric.split("-")[1])
          )
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
