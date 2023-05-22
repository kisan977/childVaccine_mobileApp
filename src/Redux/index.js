import {combineReducers} from 'redux';
import userReducer from './Reducers/loginReducer';
import authReducer from './Reducers/authReducer';
import registerReducer from './Reducers/registerReducer';
import childReducer from './Reducers/childReducer';
import appointmentReducer from './Reducers/appointmentReducer';
import profileReducer from './Reducers/profileReducer';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  register: registerReducer,
  childReducer: childReducer,
  appointmentReducer: appointmentReducer,
  profile: profileReducer,
});

export default rootReducer;
