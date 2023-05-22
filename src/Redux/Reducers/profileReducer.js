import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Action types
const SET_PARENT_PROFILE = 'SET_PARENT_PROFILE';
const SET_IMAGE = 'SET_IMAGE';
const SET_SELECTED_FILE = 'SET_SELECTED_FILE';
export const UPDATE_FORM_VALUE = 'UPDATE_FORM_VALUE';

export const updateFormValue = formValue => ({
  type: UPDATE_FORM_VALUE,
  payload: formValue,
});

// Action creators
export const setParentProfile = profile => ({
  type: SET_PARENT_PROFILE,
  payload: profile,
});

export const setImage = image => ({
  type: SET_IMAGE,
  payload: image,
});

export const setSelectedFile = file => ({
  type: SET_SELECTED_FILE,
  payload: file,
});

// Thunk to fetch parent profile data
export const fetchParentProfile = () => async dispatch => {
  try {
    const userString = await AsyncStorage.getItem('user');
    const user = JSON.parse(userString);
    const token = user.token.access;

    const response = await axios.get(
      'http://10.0.2.2:8000/api/users/parent/profile',
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    const profile = response.data;
    dispatch(setParentProfile(profile));

    if (profile.length > 0) {
      dispatch(setImage(profile[0].image));
      dispatch(setSelectedFile(null));
    }

    console.log(profile);
  } catch (error) {
    console.log(error);
  }
};

// Thunk to edit parent image
export const editImage = (parentId, selectedFile) => async dispatch => {
  try {
    const formData = new FormData();

    if (!selectedFile) {
      console.log('No file selected');
      return;
    }

    const userString = await AsyncStorage.getItem('user');
    const user = JSON.parse(userString);
    const token = user.token.access;

    formData.append('image', selectedFile);
    const response = await axios.patch(
      `http://10.0.2.2:8000/api/users/parent/edit/${parentId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(response);
  } catch (err) {
    console.log(err);
    console.log(err.message);
    console.error('Request:', err.request);
  }
};

// Initial state
const initialState = {
  parentProfile: [],
  image: null,
  selectedFile: null,
};

// Reducer
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PARENT_PROFILE:
      return {
        ...state,
        parentProfile: action.payload,
      };
    case SET_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    case SET_SELECTED_FILE:
      return {
        ...state,
        selectedFile: action.payload,
      };
    default:
      return state;
    case UPDATE_FORM_VALUE:
      return {...state, formValue: action.payload};
  }
};

export default profileReducer;
