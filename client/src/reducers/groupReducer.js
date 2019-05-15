import {type} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case type.CREATE_GROUP:
      return { ...state, [action.payload.id]: action.payload };
    case type.FETCH_GROUP:
      return { ...state, [action.payload.id]: action.payload };
    case type.FETCH_ALL_GROUPS:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}