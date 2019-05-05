import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import imageReducer from './imageReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  profile: profileReducer,
  image: imageReducer
});