import { GET_ALL_DOGS, GET_TEMPERAMENT, GET_SEARCHED_DOGS } from "../actions";
import {} from "../actions";

const initialState = {
  dogs: [],
  temperaments: [],
  searched: [],
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_TEMPERAMENT:
      return {
        ...state,
        temperaments: action.payload,
      };
    case GET_SEARCHED_DOGS:
      return {
        ...state,
        searched: action.payload,
      };
    default:
      return { ...state };
  }
}
