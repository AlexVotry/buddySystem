import { type } from '../actions/types';

export default function(state=null, action) {
  switch (action.type) {
    case type.FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}