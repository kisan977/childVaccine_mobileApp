import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {loginSuccess} from './authReducer';
import axios from 'axios';

// Initial state
const initialState = {
  email: 'ksnbasyal@gmail.com',
  password: 'P@ssword12345',
};

// Action types
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const CLEAR_INPUTS = 'CLEAR_INPUTS';
const PARENT_LOGIN = 'PARENT_LOGIN'; // New action type for parentLogin

// Action creators
export const updateEmail = email => ({
  type: UPDATE_EMAIL,
  payload: email,
});

export const updatePassword = password => ({
  type: UPDATE_PASSWORD,
  payload: password,
});
export const clearInputs = () => ({
  type: CLEAR_INPUTS,
});

export const parentLogin = (email, password) => dispatch => {
  dispatch({type: PARENT_LOGIN});
  axios
    .post(`http://10.0.2.2:8000/api/users/login`, {
      email: email,
      password: password,
    })
    .then(response => {
      if (response?.data?.status == 'success') {
        Toast.show({
          text1: 'Success!',
          text2: 'Successfully Login.',
          visibilityTime: 3000,
          position: 'bottom',
        });
        dispatch(loginSuccess(response));

        dispatch(clearInputs());
        AsyncStorage.setItem('user', JSON.stringify(response.data));
      }
    })
    .catch(err => {
      if (err) {
        Toast.show({
          type: 'error',
          text1: err?.response?.data?.errors[0],
          position: 'bottom',
        });
      }
    });
};

// Reducer
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case CLEAR_INPUTS:
      return initialState;
    case PARENT_LOGIN: // Add a case for the PARENT_LOGIN action type
      return state;
    default:
      return state;
  }
}
