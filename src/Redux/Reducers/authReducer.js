// authReducer.js

// Initial state
const initialState = {
  user: null,
};

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginSuccess = user => ({type: LOGIN_SUCCESS, payload: user});

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
