import { type } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case type.FETCH_PROFILE:
      return action.payload;
    default:
      return state;
  }
}