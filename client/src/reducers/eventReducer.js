import { type } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case type.CREATE_EVENT:
      return {...state, [action.payload._id]: action.payload};
    case type.FETCH_EVENT:
      return {...state, [action.payload._id]: action.payload};
    case type.FETCH_ALL_EVENTS:
      return {...state, [action.payload._id]: action.payload};
    default:
      return state;
  }
}