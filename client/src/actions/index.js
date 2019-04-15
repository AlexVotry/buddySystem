import axios from 'axios';
import { type } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: type.FETCH_USER, payload: res.data });
}