import axios from 'axios';
import { type } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: type.FETCH_USER, payload: res.data });
};

export const submitProfile = (values, history) => async dispatch => {
  // console.log('history', history);
  console.log('values: ', values);
  const res = await axios.post('/api/profile', values);
  console.log('api response: ', res.data);
  
  // history.push('/');
  dispatch({ type: type.FETCH_PROFILE, payload: res.data });
};

export const fetchProfile = () => async dispatch => {
  const res = await axios.get('/api/profile');

  dispatch({ type: type.FETCH_PROFILE, payload: res.data });
};

export const storeImage = (id, signature) => {
  console.log('id', id, 'sig:', signature);
  return {
    type: type.STORE_IMAGE,
    payload: { id, signature}
  };
};