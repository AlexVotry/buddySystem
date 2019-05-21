import { type } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case type.CREATE_EVENT:
      return [action.payload, ...state];
    case type.FETCH_EVENT:
      return [action.payload, ...state];
    case type.FETCH_ALL_EVENTS:
      return [action.payload, ...state];
    default:
      return state;
  }
}
