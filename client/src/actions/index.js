import axios from 'axios';
import { type } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: type.FETCH_USER, payload: res.data });
};

export const submitProfile = values => async dispatch => {
  // console.log('values: ', values);
  const res = await axios.post('/api/profile', values);
  // console.log('api response: ', res.data);
  
  dispatch({ type: type.CREATE_PROFILE, payload: res.data });
};

export const submitEvents = values => async dispatch => {
  console.log('values:', values);
  const res = await axios.post('/api/event', values);
  console.log('api submit events response', res.data);
  
  dispatch({type: type.CREATE_EVENT, payload: res.data });
}

export const submitGroup = (values, id) => async dispatch => {
  console.log('values:', values);
  const res = await axios.post(`/api/group/${id}`, values);
  console.log('api response', res.data);
  
  dispatch({type: type.CREATE_GROUP, payload: res.data });
}

// export const fetchProfile = () => async dispatch => {
//   const res = await axios.get('/api/profile');
  
//   dispatch({ type: type.FETCH_PROFILE, payload: res.data });
// };

export const fetchOneEvent = id => async dispatch => {
  console.log('fetch id:', id);
  const res = await axios.get(`/api/event/${id}`);
  
  console.log('api fetchOne response', res.data);
  dispatch({ type: type.FETCH_EVENT, payload: res.data });
}

export const storeImage = (id, signature) => {
  console.log('id', id, 'sig:', signature);
  return {
    type: type.STORE_IMAGE,
    payload: { id, signature}
  };
};