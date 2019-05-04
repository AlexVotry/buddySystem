import { type } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case type.STORE_IMAGE:
      return {...state, id: action.payload.id, signature: action.payload.signature };
    default:
      return state;
  }
}