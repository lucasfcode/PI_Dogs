import {
  GET_ALL_DOGS,
  GET_TEMPERAMENT,
  GET_SEARCHED_DOGS,
  FILTER_BY_TEMPERAMENT,
  ASCENDENT,
  DESCENDENT,
  GET_CREATED,
  GET_ONLY_API,
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
      console.log("from reducer created", created);
      created.length < 1
        ? (created = ["No hay perros creados"])
        : console.log("parece que enconcramos perros creados");
      return {
        ...state,
        filtered: created.length ? created : state.dogs,
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
        searched: action.payload,
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
          mapsOfTrue &&
            console.log(
              mapsOfTrue,
              dog.name,
              "posee: ",
              tempToArr,
              "y los filtros son: ",
              action.payload
            );
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
        filtered: filter,
      };
    case ASCENDENT:
      let ordened = state.filtered.sort((a, b) => (a.name > b.name ? 1 : -1));
      console.log("ordened", ordened);
      return {
        ...state,
        filtered: ordened,
      };
    case DESCENDENT:
      let descendent = state.filtered.sort((a, b) =>
        a.name < b.name ? 1 : -1
      );
      console.log("descendent", descendent);
      return {
        ...state,
        filtered: descendent,
      };
    default:
      return { ...state };
  }
}
